import { Link } from "react-router"

export default function Header({ user }) {
    return (
        <nav>
            <Link to="/">User Blog - Blog API</Link>
            <div>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                { user
                    ? <Link to="/logout">logout</Link>
                    : <Link to="/login">login</Link>
                }
            </div>
        </nav>
    )
}
