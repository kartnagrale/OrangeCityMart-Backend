// validators/userValidator.js
const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const validateUser = (userData) => {
    return userSchema.validate(userData);
};

module.exports = validateUser;
