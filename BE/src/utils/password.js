const bcrypt = require("bcrypt");
const { BCRYPT_ROUNDS } = require("../config/constants");

function hashPassword(password) {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

function comparePassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

module.exports = { hashPassword, comparePassword };
