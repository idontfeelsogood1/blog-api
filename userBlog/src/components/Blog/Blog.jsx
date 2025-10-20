import { useOutletContext, useParams } from "react-router"
import { useState, useEffect } from "react"
import { blogsUrl } from "../../api/url"
import { fetchBlog } from "../../api/fetch"

export default function Blog() {
    const [blog, setBlog] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [user] = useOutletContext()
    const params = useParams()
    const blogId = params.blogId

    useEffect(() => {
        async function getBlog() {
            try {
                const blog = await fetchBlog(blogId)
                setBlog(blog)
                setLoading(false)
            } catch(err) {
                console.log("Error at Blog", err)
            }
        }
        getBlog()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        const comment = event.target.body.value
        const sendComment = async () => {
            try {
                const response = await fetch(`${blogsUrl}${blogId}/comment/add`, {
                    method: "POST",
                    body: JSON.stringify({ body: comment }),
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.ok) {
                    window.location.reload()
                }
            } catch(err) {
                console.log("Failed to Post comment.", err)
            }
        }
        sendComment()
    }

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    } else {
        const formattedDateBlog = blog.createAt.slice(0, 9)
        return (
            <div>
                <div>
                    <p>{formattedDateBlog}</p>
                    <p>{blog.title}</p>
                    <p>By {blog.author.username}</p>
                    <p>{blog.body}</p>
                </div>
                <div>
                    {blog.comments.map((comment) => {
                        const formattedDateComment = comment.createAt.slice(0, 9)
                        return (
                            <div>
                                <div>
                                    <span>{comment.user.username}</span>
                                    <span> | </span>
                                    <span>{formattedDateComment}</span>
                                </div>
                                <p>{comment.body}</p>
                            </div>
                        )
                    })}
                </div>
                {
                    user ? (
                        <form onSubmit={handleSubmit}>
                            <p>Post a comment: </p>
                            <textarea name="body" id="body" placeholder="Comment goes here..."></textarea>
                            <p>
                                <button type="submit">Post Comment</button>
                            </p>
                        </form>
                    ) : (
                        <p>Please login to post a comment</p>
                    )
                }
            </div>
        )
    }
}