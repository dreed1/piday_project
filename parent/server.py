from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import datetime
import json

from logic.name_registration import NameRegistrar
from logic.quiz_master import QuizMaster
from logic.user_cache import UserCache

app = Flask(__name__)
CORS(app)
qm = QuizMaster()
user_cache = UserCache()
names = NameRegistrar()

@app.route('/admin/')
def render_admin():
  return render_template('admin.html')

@app.route("/")
def hello():
   return "Hi dan!"

@app.route("/whoami")
def register():
  user_ip = request.remote_addr
  user_name = ""
  if user_cache.user_exists_with_ip(user_ip):
    user_name = user_cache.user_name_for_user_ip(user_ip)
  else:
    user_name = names.name_me()
    user_cache.register_user(user_ip, user_name)

  
  # return "{} - {}".format(user_name, user_ip)
  return json.dumps({"your_name": user_name})

@app.route("/next_question")
def next_question():
  user_ip = request.remote_addr
  next_question = qm.get_next_question_for_user(user_ip)
  if next_question:
    return json.dumps(next_question.to_dict())
  else:
    return json.dumps({
      "question": "",
      "answers": []
    })

@app.route("/answer_question", methods=['POST'])
def answer_question():
  user_ip = request.remote_addr
  params = request.args
  qm.answer_question_with_params(params)
  return ""

@app.route("/random_name")
def random_name():
  return names.random_name()

@app.route("/all_quiz")
def debug_quiz():
  questions = [q.to_dict() for q in qm.questions] 
  return json.dumps(questions)

@app.route("/reset_quiz")
def reset_quiz():
  qm.reset_quiz()
  return json.dumps({"result": "Quiz Reset!"})

@app.route("/reset_names")
def reset_names():
  user_cache.reset()
  return json.dumps({"result": "Names Reset!"})


if __name__ == "__main__":
   app.run(host='0.0.0.0', port=80, debug=True)