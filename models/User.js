const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    business: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        min: 4,
        max: 250
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 250
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
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
    }
});

module.exports = mongoose.model('User', UserSchema);