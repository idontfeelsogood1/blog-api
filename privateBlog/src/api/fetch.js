import { blogsUrl } from "./url"

export async function fetchBlogs() {
    try {
        console.log(blogsUrl)
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