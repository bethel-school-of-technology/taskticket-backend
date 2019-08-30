const mongoose = require('mongoose');

const ResponseSchema = mongoose.Schema({
    receivedMessage: {
        type: String,
        required: true
    },
    adminMessage: {
        type: String,
        required: true
    },
    composeMessage: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },


});

module.exports = mongoose.model('response', ResponseSchema);