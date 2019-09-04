const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
    commentsId: {
        type: String,
        required: true
    },
    requestId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },


});

module.exports = mongoose.model('comments', CommentsSchema);