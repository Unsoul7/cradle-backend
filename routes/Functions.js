const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Post = require('../models/Post')

router.post('/profile', async (req,res) => {
    try{
        const {username} = req.body
        const profiledata = await User.findOne({username}).populate(['posts','followers','following']).select('-password')
        return res.status(200).json(profiledata)
    }
    catch(error){
        return res.status(404).send('Internal Server Error')
    }
})

router.post('/updatefollower', async (req,res) => {
    try{
        const {username, followeduser} = req.body
        const follower = await User.findOne({username}).populate('followers').select('-password')
        let isExist = follower.followers.indexOf(followeduser, start)
        if(isExist != -1){
            res.send(isExist)

        }
    }
    catch(error){
        return res.status(404).send('Internal Server Error')
    }
})
module.exports = router