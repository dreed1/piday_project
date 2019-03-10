from os.path import expanduser
import os
import json

cwd = os.getcwd()
names_file = "{}/api_server/json_files/names.json".format(cwd)
quiz_file = "{}/api_server/json_files/quiz.json".format(cwd)

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
