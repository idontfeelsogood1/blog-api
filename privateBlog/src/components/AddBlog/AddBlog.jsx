import { useNavigate } from "react-router"
import { addBlog } from "../../api/update"
import style from "./AddBlog.module.css"

export default function AddBlog() {
    const navigate = useNavigate()

    function handleSubmit(event) {
        const callback = async () => {
            try {
                event.preventDefault()
                const title = event.target.title.value
                const published = event.target.published.value
                const body = event.target.body.value
                console.log(published)
                await addBlog(title, published, body)
                navigate("/blogs")
            } catch(err) {
                console.log("Error at AddPost: ", err)
            }  
        }
        callback()
    }

    return (
        <div className={style.container}>
            <a href="/blogs">View All Blogs</a>
            <div className={style.addBlogContainer}>
                <h1>Create New Blog</h1>
                <form onSubmit={handleSubmit}>
                    <p><label htmlFor="title">Title:</label></p>
                    <input type="text" name="title" id="title" />
                    <p><label htmlFor="published">Set Status</label></p>
                    <select name="published" id="published">
                        <option value="false">Unpublished</option>
                        <option value="true">Published</option>
                    </select>
                    <p><label htmlFor="body">Blog Content:</label></p>
                    <textarea name="body" id="body"></textarea>
                    <button type="submit">Create Blog</button>
                </form>
            </div>
        </div>
    )
}