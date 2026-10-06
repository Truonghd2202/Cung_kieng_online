const prisma = require("../config/prisma");

const publicUserSelect = Object.freeze({
  id: true,
  full_name: true,
  email: true,
  avatar_url: true,
  role: true,
  status: true,
  date_of_birth: true,
  gender: true,
  phone: true,
  bio: true,
  created_at: true,
});

function findByEmail(email, client = prisma) {
  return client.users.findUnique({ where: { email } });
}

function findById(id, client = prisma) {
  return client.users.findUnique({ where: { id } });
}

function findAuthStateById(id, client = prisma) {
  return client.users.findUnique({
    where: { id },
    select: { id: true, role: true, status: true, password_hash: true },
  });
}

function findPublicById(id, client = prisma) {
  return client.users.findUnique({ where: { id }, select: publicUserSelect });
}

function create(data, client = prisma) {
  return client.users.create({ data });
}

function updateLastLogin(id, client = prisma) {
  const now = new Date();
  return client.users.update({ where: { id }, data: { last_login_at: now, updated_at: now } });
}

function updatePassword(id, passwordHash, client = prisma) {
  return client.users.update({
    where: { id },
    data: { password_hash: passwordHash, updated_at: new Date() },
  });
}

module.exports = {
  publicUserSelect,
  findByEmail,
  findById,
  findAuthStateById,
  findPublicById,
  create,
  updateLastLogin,
  updatePassword,
};
