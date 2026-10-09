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

module.exports = { registerInterest, removeInterest };
