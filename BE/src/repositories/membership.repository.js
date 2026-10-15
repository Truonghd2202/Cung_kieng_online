const prisma = require("../config/prisma");

function registerInterest(email, client = prisma) {
  return client.membership_interests.upsert({
    where: { email },
    create: { email },
    update: {},
  });
}

function removeInterest(email, client = prisma) {
  return client.membership_interests.deleteMany({ where: { email } });
}

function findInterest(email, client = prisma) {
  return client.membership_interests.findUnique({
    where: { email },
    select: {
      email: true,
      created_at: true,
    },
  });
}

module.exports = {
  registerInterest,
  removeInterest,
  findInterest,
};
