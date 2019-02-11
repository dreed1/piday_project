from util.json_loader import JsonFileLoader

from model.quiz_question import QuizQuestion, QuizAnswer

questions_list_key = "questions"

class QuizMaster(object):
  def __init__(self):
    self._reset_quiz()

  def reset_quiz(self):
    self._reset_quiz();

  def _reset_quiz(self):
    self.ipToQuizStepCache = {}
    self._load_quiz()

  def _load_quiz(self):
    self.questions = []
    quiz_data = JsonFileLoader.load_quiz_questions()
    questions_list = quiz_data[questions_list_key]
    for question_dict in questions_list:
      question = QuizQuestion(question_dict)
      self.questions.append(question)

  def get_next_question_for_user(self, user_ip):
    ip_string = "{}".format(user_ip)
    if len(self.questions) == 0:
      print("I dont actually have any questions.")
      return None

    if self.ipToQuizStepCache.get(ip_string, -1) is -1:
      self.ipToQuizStepCache[ip_string] = 0
      return self.questions[0]
    else:
      last_quiz_step = self.ipToQuizStepCache[ip_string]
      next_quiz_step = last_quiz_step + 1
      if next_quiz_step < len(self.questions):
        self.ipToQuizStepCache[ip_string] = next_quiz_step
        return self.questions[next_quiz_step]
      else:
        print("User finished the quiz, theyre done")
        return None

  def answer_question_with_params(self, params):
    print("i have params {}".format(params))

  def answer_question(self, user_ip, answer):
    return "I dont work yet"

