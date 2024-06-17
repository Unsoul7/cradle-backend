const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    post: {
        type: String
    },
    title :{
        type : String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number
    },
    comments : [{
        type: String
    }]
})

module.exports = mongoose.model('Post', PostSchema)