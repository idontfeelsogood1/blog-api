const db = require('../prisma/queries.js')

async function addCommentPost(req, res) {
    try {
        const userId = parseInt(req.user.id)
        const blogId = parseInt(req.params.blogId)
        const body = req.body.body
        await db.addComment(userId, blogId, body)
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {
    addCommentPost,
}