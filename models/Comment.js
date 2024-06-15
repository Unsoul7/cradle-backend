const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment : {
        type: String
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Comment', CommentSchema)