const mongoose = require('mongoose');

const UserProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    business: {
        type: String,
        required: true
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
    }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);