const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true
    },
    response: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },


});

module.exports = mongoose.model('Comments', CommentsSchema);