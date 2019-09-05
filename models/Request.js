const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    urgency: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Request', RequestSchema);