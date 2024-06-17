const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comments : {
        type: String
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    username: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User'
        type : String
    },
})

module.exports = mongoose.model('Comment', CommentSchema)