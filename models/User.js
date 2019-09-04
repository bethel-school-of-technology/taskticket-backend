const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        min: 4,
        max: 250
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1075,
        min: 7
    },
    isAdmin: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);