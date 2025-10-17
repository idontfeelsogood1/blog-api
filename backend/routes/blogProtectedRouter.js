const { Router } = require('express')
const router = new Router()
const blogController = require('../controllers/blogController')

// Get all blogs
router.get('/', blogController.allBlogGet)
router.get('/:blogId', blogController.blogWithEverythingGet)

// Publish blog
router.put('/publish/:blogId', blogController.publishBlogPut)

// Unpulish blog
router.put('/unpublish/:blogId', blogController.unpublishBlogPut)

// Add new blog
router.post('/add', blogController.addBlogPost)

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router