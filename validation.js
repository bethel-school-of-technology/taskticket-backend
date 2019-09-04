//VALIDATION
const Joi = require('@hapi/joi');

const userValidation = (data) => {
    const schema = {
        fullName: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        isAdmin: Joi.boolean()
    };
    return Joi.validate(data, schema);
};

const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema)
};

const adminValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        isAdmin: Joi.boolean()
    };
    return Joi.validate(data, schema)
}

module.exports.loginValidation = loginValidation;
module.exports.userValidation = userValidation;
module.exports.adminValidation = adminValidation;
