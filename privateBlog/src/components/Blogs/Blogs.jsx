import { useState, useEffect } from "react"
import { fetchBlogs } from "../../api/fetch"
import style from "./Blogs.module.css"

export default function BlogContainer() {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function populateBlogs() {
            try {
                // CHANGE THIS TO FETCH ALL BLOGS WITH USERNAME
                // WORK ON DB TO RETURN A LIST OF BLOGS FIRST
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
                                    <td>{blog.title}</td>
                                    <td>{blog.author.username}</td>
                                    <td>{formattedDate}</td>
                                    <td>Some status</td>
                                    <td>Some options</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}