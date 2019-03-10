import enum
import uuid

question_text_key = "question"

answer_list_key = "answers"
answer_text_key = "display_text"
answer_value_key = "backend_value"
answer_image_key = "image_url"

class QuizAnswer(object):
  def __init__(self, dictionary):
    self.id = str(uuid.uuid4())
    self.answer_text = "Answer text"
    self.answer_value = "Answer value"
    self.image_url = None
    self.user_ips_with_answer = []
    self.process_dictionary(dictionary)

  def process_dictionary(self, dict):
    self.answer_text = dict[answer_text_key]
    self.answer_value = dict[answer_value_key]
    if dict.get(answer_image_key, None) is not None:
      self.image_url = dict[answer_image_key]

  def to_dict(self, include_answer_state=False):
    d = {
      "id": self.id,
      "text": self.answer_text,
      "value": self.answer_value,
      "image_url": self.image_url
    }

    if include_answer_state:
      d.update({"answers_count": len(self.user_ips_with_answer)})

    return d


class QuizQuestion(object):
  def __init__(self, dictionary):
    self.id = str(uuid.uuid4())
    self.question_text = ""
    self.answers = []
    self.process_dictionary(dictionary)

  def process_dictionary(self, dict):
    self.question_text = dict[question_text_key]
    answers_list = dict[answer_list_key]
    for answer_dict in answers_list:
      answer = QuizAnswer(answer_dict)
      self.answers.append(answer)

  def process_answer_with_user_ip(self, answer_id, user_ip_string) -> bool:
    for answer in self.answers:
      if answer.id == answer_id:
        answer.user_ips_with_answer.append(user_ip_string)
        return True
    return False

  def to_dict(self, include_answer_state=False):
    return {
      "id": self.id,
      "question": self.question_text,
      "answers": [a.to_dict(include_answer_state=include_answer_state) for a in self.answers]
    }