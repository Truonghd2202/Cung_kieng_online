
const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/api-error");

function toPublicUser(user) {
  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    avatarUrl: user.avatar_url,
    role: user.role,
    status: user.status,
    dateOfBirth: user.date_of_birth,
    gender: user.gender,
    phone: user.phone,
    bio: user.bio,
    createdAt: user.created_at,
  };
}

function toPublicSettings(settings) {
  return {
    locale: settings.locale,
    theme: settings.theme,
    emailNotifications: settings.email_notifications,
    pushNotifications: settings.push_notifications,
    updatedAt: settings.updated_at,
  };
}

async function getProfile(userId) {
  const user = await userRepository.findPublicById(userId);
  if (!user) throw new ApiError(404, "User not found");
  return toPublicUser(user);
}

async function updateProfile(userId, input) {
  const data = {};
  if (input.fullName !== undefined) data.full_name = input.fullName;
  if (input.dateOfBirth !== undefined) {
    data.date_of_birth = input.dateOfBirth === null ? null : new Date(`${input.dateOfBirth}T00:00:00.000Z`);
  }
  for (const [inputKey, column] of [
    ["gender", "gender"],
    ["phone", "phone"],
    ["bio", "bio"],
  ]) {
    if (input[inputKey] !== undefined) data[column] = input[inputKey] || null;
  }

  return toPublicUser(await userRepository.updateProfile(userId, data));
}

async function getSettings(userId) {
  return toPublicSettings(await userRepository.getSettings(userId));
}

async function updateSettings(userId, input) {
  const data = {};
  if (input.locale !== undefined) data.locale = input.locale;
  if (input.theme !== undefined) data.theme = input.theme;
  if (input.emailNotifications !== undefined) data.email_notifications = input.emailNotifications;
  if (input.pushNotifications !== undefined) data.push_notifications = input.pushNotifications;
  return toPublicSettings(await userRepository.updateSettings(userId, data));
}

function getTopics(userId) {
  return userRepository.getTopics(userId);
}

function replaceTopics(userId, topics) {
  return userRepository.replaceTopics(userId, topics);
}

module.exports = { getProfile, updateProfile, getSettings, updateSettings, getTopics, replaceTopics };
