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

function updateProfile(id, data, client = prisma) {
  return client.users.update({
    where: { id },
    data: { ...data, updated_at: new Date() },
    select: publicUserSelect,
  });
}

function getSettings(userId, client = prisma) {
  return client.user_settings.upsert({
    where: { user_id: userId },
    create: { user_id: userId },
    update: {},
  });
}

function updateSettings(userId, data, client = prisma) {
  return client.user_settings.upsert({
    where: { user_id: userId },
    create: { user_id: userId, ...data },
    update: { ...data, updated_at: new Date() },
  });
}

async function getTopics(userId, client = prisma) {
  const rows = await client.user_topics.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "asc" },
    select: { topic: true },
  });
  return rows.map((row) => row.topic);
}

function replaceTopics(userId, topics) {
  return prisma.$transaction(async (transaction) => {
    await transaction.user_topics.deleteMany({ where: { user_id: userId } });
    if (topics.length) {
      await transaction.user_topics.createMany({
        data: topics.map((topic) => ({ user_id: userId, topic })),
      });
    }
    return getTopics(userId, transaction);
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
  updateProfile,
  getSettings,
  updateSettings,
  getTopics,
  replaceTopics,
};
