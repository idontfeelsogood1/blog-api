import { blogsUrl } from "./url"

export async function fetchBlogs() {
    try {
        const response = await fetch(blogsUrl)
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