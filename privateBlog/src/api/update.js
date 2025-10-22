import { publishUrl, unpublishUrl, addBlogUrl } from "./url.js"

export async function changeBlogStatus(blogId, hasPublished) {
    try {
        if (hasPublished) {
            const response = await fetch(`${unpublishUrl}/${blogId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}` 
                }
            })
            if (!response.ok) {
                throw new Error("Unpublish blog failed.")
            }
        } else {
            const response = await fetch(`${publishUrl}/${blogId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}` 
                }
            })
            if (!response.ok) {
                throw new Error("Publish blog failed.")
            }
        }
    } catch(err) {
        console.log("Error at changeBlogStatus", err)
    }
}

export async function addBlog(title, published, body) {
    try {
        const response = await fetch(addBlogUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": 'application/json', 
            },
            body: JSON.stringify({
                title: title,
                published: published,
                body: body,
            })
        })
        if (!response.ok) {
            throw new Error("Add blog failed.")
        }
    } catch(err) {
        console.log("Error at addBlog", err)
    }
}