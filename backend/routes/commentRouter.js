const { Router } = require('express')
const router = new Router({ mergeParams: true })
const commentController = require('../controllers/commentController')
const passport = require('passport')

// PUBLIC ROUTE 
router.post('/add', passport.authenticate('jwt', { session: false }), 
    (req, res, next) => {
        if (!req.user) {
            return res.sendStatus(401)
        }
        next()
    },
    commentController.addCommentPost
)

// PROTECTED ROUTE 
router.delete('/delete/:commentId', passport.authenticate('jwt', { session: false }), 
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

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router