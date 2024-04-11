const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      password_confirm: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('Password Confirm'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  changePasswordUser: {
    body: {
      currentPassword: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('Current Password'),
      newPassword: joi.string().min(6).max(32).required().label('New Password'),
      newPasswordConfirm: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('New Password Confirm'),
    },
  },
};
