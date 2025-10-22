import style from "./Comments.module.css"
import { fetchComments } from "../../api/fetch"
import { useEffect, useState } from "react"
import { deleteComment } from "../../api/update"

export default function Comments() {
    const [comments, setComments] = useState([])
    const [isLoading, setLoading] = useState(true)

    function handleClick(commentId) {
        const callback = async () => {
            try {
                await deleteComment(commentId)
                window.location.reload()
            } catch(err) {
                console.log("Error at Comments in handleClick: ", err)
            }
        }   
        callback()
    }

    useEffect(() => {
        const callback = async () => {
            try {
                const comments = await fetchComments()
                setComments(comments)
                setLoading(false)
            } catch(err) {
                console.log("Error at Comments: ", err)
            }
        }
        callback()
    }, [])

    if (isLoading) {
        return (
            <div>
                <h1>Comments</h1>
                <h2 className={style.loading}>Loading Comments...</h2>
            </div>
        )
    } else {
        return (
            <div className={style.container}>
                <h1>Comments</h1>
                <div className={style.commentContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Comment</th>
                                <th scope="col">Author</th>
                                <th scope="col">Blog</th>
                                <th scope="col">Date</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comment) => {
                                const formattedDate = comment.createAt.slice(0, 10)
                                return (
                                    <tr>
                                        <td className={style.body}>{comment.body}</td>
                                        <td className={style.author}>{comment.user.username}</td>
                                        <td className={style.blog}>{comment.blog.title}</td>
                                        <td className={style.date}>{formattedDate}</td>
                                        <td className={style.delete} onClick={() => {handleClick(comment.id)}}><button>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}