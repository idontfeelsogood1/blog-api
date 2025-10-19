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