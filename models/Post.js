const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    post: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number
    },
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }]
})

module.exports = mongoose.model('Post', PostSchema)