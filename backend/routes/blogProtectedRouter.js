const { Router } = require('express')
const router = new Router()
const blogController = require('../controllers/blogController')

// Get all blogs
router.get('/', blogController.allBlogGet)
// router.get('/:blogId', blogController.blogWithEverythingGet)

// Publish blog
// router.put('/:blogId/publish', blogController.publishBlogPut)

// Unpulish blog
// router.put('/:blogId/unpublish', blogController.unpublishBlogPut)

// Add new blog
// router.post('/add', blogController.addBlogPost)

// Delete comment
// router.delete('/:blogId/:commentId/delete', blogController.commentDelete)

// Not found
router.use((req, res) => {
    return res.sendStatus(404)
})

module.exports = router