import { Link } from "react-router"
import style from "./Header.module.css"

export default function Header({ user }) {
    if (user?.isWriter) {
        return (
            <nav>
                <Link className={style.indexLink} to="/">Admin Dashboard - Blog API</Link>
                <div className={style.linkContainer}>
                    <Link className={style.link} to="/about">About</Link>
                    <Link className={style.link} to="/blogs">Blogs</Link>
                    <Link className={style.link} to="/comments">Comments</Link>
                    <Link className={style.link} to="/users">Users</Link>
                    <Link className={style.link} to="/logout">logout</Link>
                </div>
            </nav> 
        )
    } else {
        return (
            <nav>
                <Link className={style.indexLink} to="/">Admin Dashboard - Blog API</Link>
                <div className={style.linkContainer}>
                    <Link className={style.link} to="/about">About</Link>
                    { user
                        ? <Link className={style.link} to="/logout">logout</Link>
                        : <Link className={style.link} to="/login">login</Link>
                    }
                </div>
            </nav>
        )
    }
}
