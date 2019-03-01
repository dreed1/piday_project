from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit
#https://flask-socketio.readthedocs.io/en/latest/

import datetime
import json
import random
import time

from logic.name_registration import NameRegistrar
from logic.quiz_master import QuizMaster
from logic.user_cache import UserCache

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
CORS(app)
socketio = SocketIO(app)
user_cache = UserCache()
qm = QuizMaster()
names = NameRegistrar()

#socket comms
@socketio.on('connect')
def post_all_the_data():
  post_user_state()
  post_quiz_state()

def post_user_state():
  # print("posting user registry")
  emit('user registry state',
    {
      "user_names" :user_cache.all_registered_names(),
      "all_users": user_cache.ip_to_names_cache,
      "user_count": len(user_cache.all_registered_names())
    },
    namespace='/',
    broadcast=True
  )

def post_user_registry(new_username):
  # print("posting new user")
  emit('user registry change', { "new_username" :new_username }, namespace='/', broadcast=True)

def post_quiz_state():
  # print("posting quiz state")
  emit('quiz state', {"quiz_results" : qm.quiz_state()}, namespace='/', broadcast=True)

def post_answer_updated(answer_id, question_id):
  # print("posting new count for an answer")
  newCount = qm.get_count_for_answer(answer_id, question_id)
  emit('new answer', {"answer_id" : answer_id, "question_id": question_id, "count": newCount}, namespace='/', broadcast=True)

def names_have_been_reset():
  post_all_the_data()

def quiz_reset():
  emit('quiz reset', {"foo" : "bar"}, namespace='/', broadcast=True)


#api routes
@app.route("/")
def hello():
   return "Hi!"

@app.route("/whoami")
def register():
  user_ip = request.remote_addr
  user_name = _register_user_with_ip(user_ip)
  return json.dumps({"your_name": user_name})

def _register_user_with_ip(user_ip):
  user_name = ""
  if user_cache.user_exists_with_ip(user_ip):
    user_name = user_cache.user_name_for_user_ip(user_ip)
  else:
    user_name = names.name_me()
    user_cache.register_user(user_ip, user_name)
    post_user_registry(user_name)
  return user_name

@app.route("/next_question")
def next_question():
  user_ip = request.remote_addr
  next_question = _get_next_question_for_ip(user_ip)
  if next_question:
    return json.dumps(next_question.to_dict())
  else:
    return json.dumps({
      "question": "",
      "answers": []
    })

def _get_next_question_for_ip(user_ip):
  return qm.get_next_question_for_user(user_ip)

@app.route("/answer_question", methods=['POST'])
def answer_question():
  user_ip = request.remote_addr
  params = json.loads(request.data)
  result = _answer_question_with_ip_and_params(user_ip, params)
  return json.dumps({"result": result})

def _answer_question_with_ip_and_params(user_ip, params):
  question_id = params["question_id"]
  answer_id = params["answer_id"]
  result = qm.answer_question_with_answer_id(user_ip, question_id, answer_id)
  post_answer_updated(answer_id, question_id)
  print("Did that work? {}".format(result))
  return result

@app.route("/random_name")
def random_name():
  return names.random_name()

@app.route("/all_quiz")
def debug_quiz():
  questions = [q.to_dict() for q in qm.questions]
  return json.dumps(questions)

#admin routes (WONT WORK FOR YOU DO NOT USE)

# if you arent on the same computer as the server you shouldnt be admin
# PROTIP: dont do this in a production environment, use a real identity provider and permissions
def should_allow_admin_access(ip_address):
  return ip_address == '127.0.0.1'

@app.route('/admin/')
def render_admin():
  user_ip = request.remote_addr
  print("type of user IP is '{}'".format(type(user_ip)))
  if (should_allow_admin_access(user_ip)):
    return render_template('admin.html')
  else:
    return render_template('you_are_not_admin.html')

@app.route("/reset_quiz")
def reset_quiz():
  user_ip = request.remote_addr
  if (should_allow_admin_access(user_ip)):
    qm.reset_quiz()
    return json.dumps({"result": "Quiz Reset!"})
  else:
    return json.dumps({"result": "YOU ARE NOT ADMIN PLEASE STAHP"})

@app.route("/reset_names")
def reset_names():
  user_ip = request.remote_addr
  if (should_allow_admin_access(user_ip)):
    user_cache.reset()
    return json.dumps({"result": "Names Reset!"})
  else:
    return json.dumps({"result": "YOU ARE NOT ADMIN PLEASE STAHP"})

@app.route("/test_a_bunch_of_users")
def test_a_bunch_of_users():
  user_ip = request.remote_addr
  print("lemme test a bunch of fake users")
  if (should_allow_admin_access(user_ip)):
    fake_user_ips = _create_fake_user_ips(10)
    _register_fake_users_with_ips(fake_user_ips)
    _simulate_quiz_for_users_with_ips(fake_user_ips)
    return json.dumps({"result": "I created {} users and put them through the quiz".format(len(fake_user_ips))})
  else:
    return json.dumps({"result": "YOU ARE NOT ADMIN PLEASE STAHP"})


def _create_fake_user_ips(number_of_fake_users):
  fake_user_ips = []
  for fake_user_index in range(number_of_fake_users):
    fake_user_ips.append(".".join(str(random.randint(0, 255)) for _ in range(4)))
  return fake_user_ips

def _register_fake_users_with_ips(fake_user_ips):
  for fake_ip in fake_user_ips:
    _register_user_with_ip(fake_ip)

def _simulate_quiz_for_users_with_ips(fake_user_ips):
  for user_ip in fake_user_ips:
    _simulate_quiz_for_user_with_ip(user_ip)
    time.sleep(0.4)

def _simulate_quiz_for_user_with_ip(user_ip):
  quiz_running = True
  print("quiz started for {}".format(user_ip))
  while quiz_running:
    next_question = _get_next_question_for_ip(user_ip)
    if next_question:
      print("next question: '{}'".format(next_question.question_text))
      _answer_question_randomly_for_user_with_ip(user_ip, next_question)
    else:
      print("quiz is finished for {}".format(user_ip))
      quiz_running = False


def _answer_question_randomly_for_user_with_ip(user_ip, question):
  fake_answer_params = _simulate_random_answer_for_question(question)
  _answer_question_with_ip_and_params(user_ip, fake_answer_params)

def _simulate_random_answer_for_question(question):
  number_of_answers = len(question.answers)
  chosen_answer_idx = random.randint(0, number_of_answers - 1)
  random_answer = question.answers[chosen_answer_idx]
  return {
    "question_id": question.id,
    "answer_id": random_answer.id
  }

if __name__ == "__main__":
  socketio.run(app, host='0.0.0.0', port=80, debug=True)