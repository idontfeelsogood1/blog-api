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

module.exports = {
    getUser,
    addUser,
    getUserByUsername,
    getAllBlog,
    getAllPublishedBlog,
    getPublishedBlogWithEverything,
    getBlogWithEverything,
}