import { useOutletContext, useParams } from "react-router"
import { useState, useEffect } from "react"
import { blogsUrl } from "../../api/url"
import { fetchBlog } from "../../api/fetch"
import style from "./Blog.module.css"

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
            <h1 className={style.loading}>Loading...</h1>
        )
    } else {
        const formattedDateBlog = blog.createAt.slice(0, 9)
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <p className={style.date}>{formattedDateBlog}</p>
                    <p className={style.title}>{blog.title}</p>
                    <p className={style.author}>By {blog.author.username}</p>
                    <p className={style.body}>{blog.body}</p>
                </div>
                <div className={style.commentContainer}>
                    {blog.comments.map((comment) => {
                        const formattedDateComment = comment.createAt.slice(0, 9)
                        return (
                            <div className={style.comment}>
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
                        <form className={style.commentForm} onSubmit={handleSubmit}>
                            <p>Post a comment: </p>
                            <textarea name="body" id="body" placeholder="Comment goes here..."></textarea>
                            <button type="submit">Post Comment</button>
                        </form>
                    ) : (
                        <p className={style.loginToPost}>Please login to post a comment</p>
                    )
                }
            </div>
        )
    }
}