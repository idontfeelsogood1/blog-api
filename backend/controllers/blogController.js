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


module.exports = {
    allBlogGet,
    allPublishedBlogGet,
    publishedBlogWithEverythingGet,
}