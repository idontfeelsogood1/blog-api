const db = require('../prisma/queries.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function registerUserPost(req, res) {
    try {
        const { username, password } = req.body
        await db.addUser(username, password)
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

async function loginUserPost(req, res) {
    try {
        const { username, password } = req.body
        const user = await db.getUserByUsername(username)
        if (!user) {
            return res.sendStatus(404)
        }
        if (!await bcrypt.compare(password, user.hash)) {
            return res.sendStatus(401)
        } 
        // GENERATE TOKEN AND SEND BACK TO CLIENT
        const signOjb = {
            id: user.id,
            isWriter: user.isWriter
        }
        const token = jwt.sign(signOjb, process.env.SECRET)
        res.status(200).json({ token })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

async function verifyTokenGet(req, res) {
    try {
        if (!req.user) {
            return res.sendStatus(401)
        }
        return res.status(200).json({ user: req.user })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {
    registerUserPost,
    loginUserPost,
    verifyTokenGet,
}