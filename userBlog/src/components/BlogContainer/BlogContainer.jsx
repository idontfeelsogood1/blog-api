import { useState, useEffect } from "react"
import { fetchBlogs } from "../../api/fetch"
import { useNavigate } from "react-router"

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
                <h4>Loading Blogs...</h4>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Blogs</h1>
                <div>
                    {blogs.map((blog) => {
                        const formattedDate = blog.createAt.slice(0, 10)
                        return (
                            <div key={blog.id} onClick={() => {goToBlog(blog.id)}}>
                                <span>{formattedDate}</span>
                                <span>{blog.title}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}