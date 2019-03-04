
import random
from util.json_loader import JsonFileLoader

first_names_key = "first_names"
last_names_key = "last_names"

class NameRegistrar(object):
  def __init__(self):
    self.used_names = []
    self.all_first_names = ["Dan", "Jaclyn", "Louie"]
    self.all_last_names = ["Reed", "Klein", "Cat"]
    self.load_names()

  def load_names(self):
    data = JsonFileLoader.load_names()
    first_names = data[first_names_key]
    last_names = data[last_names_key]
    if len(first_names):
      self.all_first_names = first_names
    if len(last_names):
      self.all_last_names = last_names

  def name_me(self):
    potential_name = self._generate_new_name()
    while potential_name in self.used_names:
      potential_name = self._generate_new_name()
    self.used_names.append(potential_name)
    return potential_name

  def _generate_new_name(self):
    first_name = random.choice(self.all_first_names)
    last_name = random.choice(self.all_last_names)
    return "{} {}".format(first_name, last_name)

  def random_name(self):
    return self._generate_new_name()