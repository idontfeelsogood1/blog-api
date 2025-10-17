const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function getUser(userId) {
    try {
        return await prisma.user.findFirst({
            where: {
                id: userId,
            }
        })
    } catch(err) {
        console.log("Error in getUser: ")
        throw new Error(err)
    }
}

async function addUser(username, password) {
    try {
        const hash = await bcrypt.hash(password, 10)
        await prisma.user.create({
            data: {
                username: username,
                hash: hash,
            }
        })
    } catch(err) {
        console.log("Error in addUser: ")
        throw new Error(err)
    }
}

async function getUserByUsername(username) {
    try {
        return await prisma.user.findFirst({
            where: {
                username: username,
            }
        })
    } catch(err) {
        console.log("Error in getUserByUsername: ")
        throw new Error(err) 
    }
}

async function getAllBlog() {
    try {
        return await prisma.blog.findMany({})
    } catch(err) {
        console.log("Error at getAllBlog: ")
        throw new Error(err)
    }
}

async function getAllPublishedBlog() {
    try {
        return await prisma.blog.findMany({
            where: {
                published: true,
            }
        })
    } catch(err) {
        console.log("Error at getAllPublishedBlog: ")
        throw new Error(err)
    }
}

async function getPublishedBlogWithEverything(blogId) {
    try {
        return await prisma.blog.findFirst({
            where: {
                id: blogId,
                published: true,
            },
            include: {
                author: {
                    select: {
                        username: true,
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            }
                        }
                    }
                }
            }
        })
    } catch(err) {
        console.log("Error at getPublishedBlogWithEverything: ")
        throw new Error(err)
    }
}

async function getBlogWithEverything(blogId) {
    try {
        return await prisma.blog.findFirst({
            where: {
                id: blogId,
            },
            include: {
                author: {
                    select: {
                        username: true,
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            }
                        }
                    }
                }
            }
        })
    } catch(err) {
        console.log("Error at getBlogWithEverything: ")
        throw new Error(err)
    }
}

async function updateBlogPublish(blogId, isPublish) {
    try {
        await prisma.blog.update({
            where: {
                id: blogId,
            }, 
            data: {
                published: isPublish,
            }
        })
    } catch(err) {
        console.log("Error at updateBlogPublish: ")
        throw new Error(err)
    }
}

async function addBlog(authorId, title, body) {
    try {
        await prisma.blog.create({
            data: {
                authorId: authorId,
                title: title,
                body: body,
            }
        })
    } catch(err) {
        console.log("Error at addBlogPost: ")
        throw new Error(err)
    }
}

async function addComment(userId, blogId, body) {
    try {
        await prisma.comment.create({
            data: {
                userId: userId,
                blogId: blogId,
                body: body,
            }
        })
    } catch(err) {
        console.log("Error at addComment: ")
        throw new Error(err)
    }
}

module.exports = {
    getUser,
    addUser,
    getUserByUsername,
    getAllBlog,
    getAllPublishedBlog,
    getPublishedBlogWithEverything,
    getBlogWithEverything,
    updateBlogPublish,
    addBlog,
    addComment,
}