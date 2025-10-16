const { Router } = require('express')
const router = new Router()
const blogController = require('../controllers/blogController')
const passport = require('passport')

// PUBLIC ROUTES
// router.get('/', blogController.allPublishedBlogGet)
// router.get('/:blogId', blogController.publishedBlogWithCommentsGet)

// PROTECTED ROUTES req.user.isWriter
const blogProtectedRouter = require('./blogProtectedRouter')
router.use('/protected', passport.authenticate('jwt', { session: false }), 
    (req, res, next) => {
        if (!req.user.isWriter) {
            return res.sendStatus(403)
        } 
        next()
    },
    blogProtectedRouter
)

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router