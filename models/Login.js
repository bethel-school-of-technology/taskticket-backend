const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    }
});


module.exports = mongoose.model('Login', LoginSchema);