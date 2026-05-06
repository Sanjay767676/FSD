import bcrypt from 'bcryptjs';

const users = [
  {
    id: 'demo-user-1',
    name: 'Amina Khan',
    email: 'amina@example.com',
    passwordHash: bcrypt.hashSync('Password123!', 12),
    createdAt: new Date().toISOString(),
  },
];

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