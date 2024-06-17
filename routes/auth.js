const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.post('/register', [
    check('fullname').notEmpty(),
    check('username').notEmpty(),
    check('password').notEmpty().isLength({min : 8,max : 10})
], async (req, res, next) => {
    if (validationResult(req).errors.length != 0) {
        return res.status(404).send(validationResult(req))
    }
    // try {
        const { username, fullname, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const createdUser = new User({ fullname, username, password: hashedPass })

        await createdUser.save()
        return res.status(200).json({createdUser})

})

router.post('/login', [
    check('username').notEmpty(),
    check('password').notEmpty()
] , async (req, res) => {
    try {
        if (validationResult(req).errors.length != 0) {
            return res.status(404).send(validationResult(req))
        }
        
        const { username, password } = req.body
        const loginuser = await User.findOne({username})
        const passcheck = await bcrypt.compare(password, loginuser.password)

        if(!passcheck){
            return res.status(401).send('Invalid Password')
        }

        res.status(200).send(true)

    } catch (error) {
            return res.status(404).send('Invalid Username')
    }
})

module.exports = router