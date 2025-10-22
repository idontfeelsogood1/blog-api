import { useState, useEffect } from "react"
import { fetchBlogs } from "../../api/fetch"
import { changeBlogStatus } from "../../api/update"
import style from "./Blogs.module.css"

export default function BlogContainer() {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setLoading] = useState(true)

    // ADD FUNCTION TO PUBLISH/UNPUBLISH BLOG ON CLICK
    function handleClick(blogId, hasPublished) {
        const callback = async () => {
            try {
                await changeBlogStatus(blogId, hasPublished)
                window.location.reload()
            } catch(err) {
                console.log("Error at BlogContainer", err)
            }
        }
        callback()
    }

    useEffect(() => {
        async function populateBlogs() {
            try {
                const arr = await fetchBlogs()
                setBlogs(arr)
                setLoading(false)
            } catch(err) {
                console.log("Error at Blog: ", err)
            }
        }
        populateBlogs()
    }, [])

    if (isLoading) {
        return (
            <div>
                <h1>Blogs</h1>
                <h2 className={style.loading}>Loading Blogs...</h2>
            </div>
        )
    } else {
        return (
            <div className={style.container}>
                <h1>Blogs</h1>
                <table className={style.blogContainer}>
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Date Created</th>
                            <th scope="col">Status</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => {
                            const formattedDate = blog.createAt.slice(0, 10)
                            return (
                                <tr>
                                    <td className={style.title}>{blog.title}</td>
                                    <td className={style.author}>{blog.author.username}</td>
                                    <td className={style.date}>{formattedDate}</td>
                                    { blog.published 
                                        ? <td className={style.published}><span>Published</span></td>
                                        : <td className={style.unpublished}><span>Unpublished</span></td>   
                                    }
                                    <td className={style.changeStatus} onClick={() => {handleClick(blog.id, blog.published)}}><button>Change Status</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}