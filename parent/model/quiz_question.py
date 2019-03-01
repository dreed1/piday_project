import enum
import uuid

question_text_key = "question"

answer_list_key = "answers"
answer_text_key = "display_text"
answer_value_key = "backend_value"
answer_type_key = "answer_type"
answer_image_key = "image_url"

class AnswerType(enum.Enum):
  text = 1
  image = 2

class QuizAnswer(object):
  def __init__(self, dictionary):
    self.id = str(uuid.uuid4())
    self.answer_text = "Answer text"
    self.answer_value = "Answer value"
    self.image_url = "https://mymodernmet.com/wp/wp-content/uploads/2018/04/cats-in-food-11.jpg"
    self.answer_type = AnswerType.text
    self.user_ips_with_answer = []
    self.process_dictionary(dictionary)

  def process_dictionary(self, dict):
    self.answer_text = dict[answer_text_key]
    self.answer_value = dict[answer_value_key]
    self.answer_type = AnswerType[dict[answer_type_key]]
    if dict.get(answer_image_key, None) is not None:
      self.image_url = dict[answer_image_key]

  def to_dict(self, include_answer_state=False):
    d = {
      "id": self.id,
      "text": self.answer_text,
      "value": self.answer_value,
      "answer_type": self.answer_type.value,
      "image_url": self.image_url
    }

    if include_answer_state:
      d.update({"user_ips_with_answer": self.user_ips_with_answer})

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