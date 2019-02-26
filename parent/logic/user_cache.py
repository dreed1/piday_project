class UserCache(object):
  def __init__(self):
    self.reset();

  def reset(self):
    self.ip_to_names_cache = {}

  def register_user(self, user_ip, user_name):
    if not self.ip_to_names_cache.get(user_ip):
      self.ip_to_names_cache[user_ip] = user_name
    else:
      print("user already existed")

  def user_exists_with_ip(self, user_ip) -> bool:
    return self.ip_to_names_cache.get(user_ip)

  def user_exists_with_name(self, user_name) -> bool:
    return user_name in self.ip_to_names_cache.itervalues()

  def user_name_for_user_ip(self, user_ip):
    if self.user_exists_with_ip(user_ip):
      return self.ip_to_names_cache[user_ip]
    print("That user doesnt exit in the names cache")
    return None