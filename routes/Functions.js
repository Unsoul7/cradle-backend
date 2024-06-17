const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const searchArray = (arr, item) => {
    for (let i in arr) {
        if (item == arr[i]) {
            return { exists: true, index: i }
        }
    }
    return { exists: false, index: -1 }
}

router.post('/profile', async (req, res) => {
    try {
        const { username } = req.body
        const profiledata = await User.findOne({ username }).populate(['posts', 'followers', 'following']).select('-password')
        return res.status(200).json(profiledata)
    }
    catch (error) {
        return res.status(404).send('Internal Server Error')
    }
})

router.post('/updatefollowing', async (req, res) => {
    try {
        const { username, followeduser } = req.body
        const data = await User.findOne({ username }).populate('following').select('-password')
        const users = data.following
        const isexist = searchArray(users, followeduser)
        if (isexist.exists) {
            data.following.splice(isexist.index, 1)

            const followerdata = await User.findOne({ username: followeduser }).populate('followers').select('-password')
            const followusers = followerdata.followers
            const isfollowerexist = searchArray(followusers, username)
            followerdata.followers.splice(isfollowerexist.index, 1)
            await followerdata.save()
            await data.save()
            return res.status(200).json({ response: 'ok' })

        }
        data.following.push(followeduser)
        const followerdata = await User.findOne({ username: followeduser }).populate('followers').select('-password')
        followerdata.followers.push(username)
        await followerdata.save()
        await data.save()
        return res.status(200).json({ response: 'ok' })
    }
    catch (error) {
        return res.status(404).json({ msg: 'Internal Server Error', error: error })
    }
})


router.post('/comment', async (req, res) => {
   const {comments,username, post} = req.body
   const commentMade = new Comment({
    comments, post, username
   })
   await commentMade.save()
   const commentaddpost = await Post.findOne({_id : post})
   commentaddpost.comments.unshift(comments)
   await commentaddpost.save()
   res.send(commentaddpost)
})

router.post('/test', async (req,res) => {
    const data = await Post.create({
            post : req.body.post,
            title : req.body.title,
            user : req.body.user
    })
    res.send("done")
})
module.exports = router