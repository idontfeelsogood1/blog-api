import { useState, useEffect } from "react"
import { fetchBlogs } from "../../api/fetch"
import { useNavigate } from "react-router"
import style from "./BlogContainer.module.css"

export default function BlogContainer() {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate()

    function goToBlog(blogId) {
        navigate(`${blogId}`)
    }

    useEffect(() => {
        async function populateBlogs() {
            try {
                const arr = await fetchBlogs()
                setBlogs(arr)
                setLoading(false)
            } catch(err) {
                console.log("Error at BlogContainer: ", err)
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
                <div className={style.blogContainer}>
                    {blogs.map((blog) => {
                        const formattedDate = blog.createAt.slice(0, 10)
                        return (
                            <div className={style.blog} key={blog.id} onClick={() => {goToBlog(blog.id)}}>
                                <p className={style.date}>{formattedDate}</p>
                                <p className={style.title}>{blog.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}