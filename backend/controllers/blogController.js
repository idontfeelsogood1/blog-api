const db = require('../prisma/queries.js')

async function allBlogGet(req, res) {
    try {
        const blogs = await db.getAllBlog()
        res.status(200).json({ blogs: blogs })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

async function allPublishedBlogGet(req, res) {
    try {
        const blogs = await db.getAllPublishedBlog()
        res.status(200).json({ blogs: blogs })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

async function publishedBlogWithEverythingGet(req, res) {
    try {
        const blogId = parseInt(req.params.blogId)
        const blogs = await db.getPublishedBlogWithEverything(blogId)
        res.status(200).json({ blogs: blogs })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

async function blogWithEverythingGet(req, res) {
    try {
        const blogId = parseInt(req.params.blogId)
        const blogs = await db.getBlogWithEverything(blogId)
        res.status(200).json({ blogs: blogs })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

async function publishBlogPut(req, res) {
    try {
        const blogId = parseInt(req.params.blogId)
        await db.updateBlogPublish(blogId, true)
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)  
    }
}

async function unpublishBlogPut(req, res) {
    try {
        const blogId = parseInt(req.params.blogId)
        await db.updateBlogPublish(blogId, false)
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)  
    }
}

async function addBlogPost(req, res) {
    try {
        const authorId = req.user.id
        const { title, body, published } = req.body
        if (published === "true") {
            bool = true
        } else {
            bool = false
        }
        await db.addBlog(authorId, title, body, bool)
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)  
    }
}

module.exports = {
    allBlogGet,
    allPublishedBlogGet,
    publishedBlogWithEverythingGet,
    blogWithEverythingGet,
    publishBlogPut,
    unpublishBlogPut,
    addBlogPost,
}