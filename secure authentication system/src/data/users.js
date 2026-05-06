const users = [];

export function findUserByEmail(email) {
  return users.find((user) => user.email === email.toLowerCase()) || null;
}

export function findUserById(id) {
  return users.find((user) => user.id === id) || null;
}

export function addUser(user) {
  users.push(user);
  return user;
}

export function getUsers() {
  return users;
}