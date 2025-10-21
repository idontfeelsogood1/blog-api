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

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router