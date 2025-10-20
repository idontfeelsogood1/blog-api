import { Link } from "react-router"
import style from "./Header.module.css"

export default function Header({ user }) {
    return (
        <nav>
            <Link className={style.indexLink} to="/">User Blog - Blog API</Link>
            <div className={style.linkContainer}>
                <Link className={style.link} to="/about">About</Link>
                <Link className={style.link} to="/blog">Blog</Link>
                { user
                    ? <Link className={style.link} to="/logout">logout</Link>
                    : <Link className={style.link} to="/login">login</Link>
                }
            </div>
        </nav>
    )
}
