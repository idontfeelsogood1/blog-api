const db = require('../prisma/queries.js')

async function allBlogGet(req, res) {
    try {
        const blog = await db.getAllPublishedBlog()
        res.json({ blogs: blog })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {
    allBlogGet,
}