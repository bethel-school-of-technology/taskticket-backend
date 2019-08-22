//VALIDATION
const Joi = require('@hapi/joi');

// Signup Validation

const signupValidation = (data) => {
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
        password: Joi.string().min(6).required()
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


module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
