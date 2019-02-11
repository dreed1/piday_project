from os.path import expanduser
import json

home_directory = expanduser("~")
names_file = "{}/code/python/raspi_pin/parent/json_files/names.json".format(home_directory)
quiz_file = "{}/code/python/raspi_pin/parent/json_files/quiz.json".format(home_directory)

class JsonFileLoader(object):
  @staticmethod
  def load_names():
    return JsonFileLoader._load_file(names_file)

  @staticmethod
  def load_quiz_questions():
    return JsonFileLoader._load_file(quiz_file)    

  @staticmethod
  def _load_file(filename):
    try:
      with open(filename) as f:
        return json.load(f)
    except:
      return None
