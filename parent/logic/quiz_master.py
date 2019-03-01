from util.json_loader import JsonFileLoader

from model.quiz_question import QuizQuestion, QuizAnswer

questions_list_key = "questions"

class QuizMaster(object):
  def __init__(self):
    self._reset_quiz()

  def reset_quiz(self):
    self._reset_quiz();

  def _reset_quiz(self):
    self.questions = []
    self.ip_to_quiz_step_cache = {}
    self._load_quiz()

  def _load_quiz(self):
    self.questions = []
    quiz_data = JsonFileLoader.load_quiz_questions()
    questions_list = quiz_data[questions_list_key]
    for question_dict in questions_list:
      question = QuizQuestion(question_dict)
      self.questions.append(question)

  def quiz_state(self):
    return [q.to_dict(include_answer_state=True) for q in self.questions]

  def get_next_question_for_user(self, user_ip):
    ip_string = "{}".format(user_ip)
    if len(self.questions) == 0:
      print("I dont actually have any questions.")
      return None

    if self.ip_to_quiz_step_cache.get(ip_string, -1) is -1:
      self.ip_to_quiz_step_cache[ip_string] = 0
      return self.questions[0]
    else:
      current_quiz_step = self.ip_to_quiz_step_cache[ip_string]
      if current_quiz_step < len(self.questions):
        return self.questions[current_quiz_step]
      else:
        print("User finished the quiz, theyre done")
        return None

  def _move_user_to_next_question_step(self, user_ip_string):
    last_quiz_step = self.ip_to_quiz_step_cache[user_ip_string]
    next_quiz_step = last_quiz_step + 1
    if next_quiz_step < len(self.questions) + 1:
      self.ip_to_quiz_step_cache[user_ip_string] = next_quiz_step

  def answer_question_with_answer_id(self, user_ip, question_id, answer_id):
    user_ip_string = "{}".format(user_ip)

    if question_id == None or answer_id == None or user_ip == None:
      return False

    for question in self.questions:
      if question.id == question_id:
        question.process_answer_with_user_ip(answer_id, user_ip_string)
        self._move_user_to_next_question_step(user_ip_string)
        return True
    return False

  def get_count_for_answer(self, answer_id, question_id):
    for question in self.questions:
      if question.id == question_id:
        for answer in question.answers:
          if answer.id == answer_id:
            return len(answer.user_ips_with_answer)
    return 0

