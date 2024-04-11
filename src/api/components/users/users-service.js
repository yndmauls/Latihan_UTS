const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * check is email taken
 * @param {string} email - email
 * @returns {boolean}
 */
async function emailTaken(email) {
  const user = await usersRepository.findUserbyMail(email);

  if (user) return true;
  else return false;
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password_lama - Password Lama
 * @param {string} password_baru - Password Baru
 * @returns {boolean}
 */
async function changePasswordUser(id, currentPassword, newPassword) {
  const user = await usersRepository.getUser(id);

  if (!user) {
    return null;
  }

  const passMatch = await passwordMatched(currentPassword, user.password);
  if (!passMatch) {
    throw errorResponder(
      errorTypes.INVALID_CREDENTIALS,
      'Current Password Doesnt Match'
    );
  }

  newPassword_hashed = await hashPassword(newPassword);
  try {
    await usersRepository.changePasswordUser(id, newPassword_hashed);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailTaken,
  changePasswordUser,
};
