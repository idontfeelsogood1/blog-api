const { Router } = require('express')
const router = new Router({ mergeParams: true })
const commentController = require('../controllers/commentController')
const passport = require('passport')

// PROTECTED ROUTE 
router.use(passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        if (!req.user) {
            return res.sendStatus(401)
        } else if (!req.user.isWriter) {
            return res.sendStatus(403)
        }
        next()
    }
)
router.get('/', commentController.allCommentGet)
router.delete('/delete/:commentId', commentController.commentDelete)

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router