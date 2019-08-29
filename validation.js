//VALIDATION
const Joi = require('@hapi/joi');

const userValidation = (data) => {
    const schema = {
        business: Joi.string().min(3).required(),
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        streetAddress: Joi.string().min(4).required(),
        city: Joi.string().min(2).required(),
        state: Joi.string().min(2).required(),
        zipcode: Joi.number().min(5).required(),
        phoneNumber: Joi.number().min(11).required(),
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
