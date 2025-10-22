import { blogsUrl, commentsUrl } from "./url"

export async function fetchBlogs() {
    try {
        const response = await fetch(blogsUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}` 
            }
        })
        if (!response.ok) {
            throw new Error("Blogs fetching failed.")
        }
        const obj = await response.json()
        return obj.blogs
    } catch(err) {
        console.log("Error at fetchBlogs: ", err)
    }
}

export async function fetchBlog(blogId) {
    try {
        const response = await fetch(`${blogsUrl}${blogId}`)
        if (!response.ok) {
            throw new Error("Blog fetching failed.")
        }
        const obj = await response.json()
        return obj.blogs
    } catch(err) {
        console.log("Error at fetchBlog: ", err)
    }
}

export async function fetchComments() {
    try {
        const response = await fetch(commentsUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}` 
            }
        })
        if (!response.ok) {
            throw new Error("Comments fetching failed.")
        }
        const obj = await response.json()
        return obj.comments
    } catch(err) {
        console.log("Error at fetchComments: ", err)
    }
}