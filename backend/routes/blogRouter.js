const { Router } = require('express')
const router = new Router()
const blogController = require('../controllers/blogController')
const passport = require('passport')

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

// PUBLIC ROUTES
router.get('/', blogController.allPublishedBlogGet)
router.get('/:blogId', blogController.publishedBlogWithEverythingGet)
const commentRouter = require('./commentRouter')
router.use('/:blogId/comment', commentRouter)

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router