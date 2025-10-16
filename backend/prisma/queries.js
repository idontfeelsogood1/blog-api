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

module.exports = {
    getUser,
    addUser,
    getUserByUsername,
    getAllBlog,
    getAllPublishedBlog,
}