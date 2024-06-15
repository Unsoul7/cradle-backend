const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.post('/register', [
    check('fullname').notEmpty(),
    check('username').notEmpty(),
    check('password').notEmpty().isLength(8, 10)
], async (req, res) => {

    try {
        if (validationResult(req).errors.length != 0) {
            return res.status(404).send(validationResult(req))
        }
        const { username, fullname, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const createdUser = await User.create({ fullname, username, password: hashedPass })
        await createdUser.save()
        return res.status(200).json(createdUser)

    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send('Username Already Exists')
        } else {
            return res.status(401).send('Internal Server Error')
        }
    }
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
        const loginuser = await User.findOne({username}).populate(['posts','followers','following'])
        const passcheck = await bcrypt.compare(password, loginuser.password)

        if(!passcheck){
            return res.status(401).send('Invalid Password')
        }

        res.status(200).json(loginuser)

    } catch (error) {

            return res.status(404).send('Invalid Username')

    }
})

module.exports = router