const { Router } = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const passport = require('passport')

// PUBLIC ROUTE 
router.post('/add', passport.authenticate(), 
    (req, res, next) => {
        if (!req.user) {
            return res.sendStatus(401)
        }
        next()
    },
    commentController.addCommentPost
)

// PROTECTED ROUTE 
router.delete('/delete/:commentId', passport.authenticate(), 
    (req, res, next) => {
        if (!req.user) {
            return res.sendStatus(401)
        } else if (!req.user.isWriter) {
            return res.sendStatus(403)
        }
        next()
    },
    commentController.commentDelete
)