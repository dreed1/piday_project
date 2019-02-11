import enum

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
    self.answer_text = "Answer text"
    self.answer_value = "Answer value"
    self.image_url = "https://mymodernmet.com/wp/wp-content/uploads/2018/04/cats-in-food-11.jpg"
    self.answer_type = AnswerType.text
    self.process_dictionary(dictionary)

  def process_dictionary(self, dict):
    self.answer_text = dict[answer_text_key]
    self.answer_value = dict[answer_value_key]
    self.answer_type = AnswerType[dict[answer_type_key]]
    if dict.get(answer_image_key, None) is not None:
      self.image_url = dict[answer_image_key]

  def to_dict(self):
    return {
      "text": self.answer_text,
      "value": self.answer_value,
      "answer_type": self.answer_type.value,
      "image_url": self.image_url
    }


class QuizQuestion(object):
  def __init__(self, dictionary):
    self.question_text = ""
    self.answers = []
    self.process_dictionary(dictionary)

  def process_dictionary(self, dict):
    self.question_text = dict[question_text_key]
    answers_list = dict[answer_list_key]
    for answer_dict in answers_list:
      answer = QuizAnswer(answer_dict)
      self.answers.append(answer)

  def to_dict(self):
    return {
      "question": self.question_text,
      "answers": [a.to_dict() for a in self.answers]
    }