const { Router } = require('express')
const router = new Router()

// User resource
const userRouter = require('./userRouter')
router.use('/user', userRouter)

// Blog resource
const blogRouter = require('./blogRouter')
router.use('/blog', blogRouter)

// Comment resource
const universalCommentRouter = require('./universalCommentRouter')
router.use('/comment', universalCommentRouter)

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router