import { publishUrl, unpublishUrl } from "./url.js"

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