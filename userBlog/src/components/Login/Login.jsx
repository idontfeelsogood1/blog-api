import { getToken, verifyToken } from "../../api/auth"
import { useNavigate } from "react-router"
import { useOutletContext } from "react-router"
import style from "./Login.module.css"

export default function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useOutletContext()

    function handleSubmit(event) {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        const callback = async () => {
            try {
                const token = await getToken(username, password)
                if (!token) {
                    throw new Error("Fetching token failed")
                }
                localStorage.setItem("token", token)
                const res = await verifyToken()
                setUser(res)
                navigate("/")
            } catch(err) {
                console.log("Error at Login", err)
            }
        }
        callback()
    }

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <p>
                    <p>Username</p>
                    <input type="text" name="username" id="username" />
                </p>
                <p>
                    <p>Password</p>
                    <input type="password" name="password" id="password" />
                </p>
                <button type="submit">Login</button>
                <p>Not a member? <a href="/register">Create an account.</a></p>
            </form>
        </div>
    )
}