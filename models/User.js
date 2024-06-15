const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/cradledb')

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    dateofbirth: {
        type: Date
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    profile: {
        type: String,
        default: 'https://i.pinimg.com/564x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg'
    },
    banner: {
        type: String
    }
})

module.exports = mongoose.model('User',UserSchema)