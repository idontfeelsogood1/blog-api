import { getToken, verifyToken } from "../../api/auth"
import { useNavigate } from "react-router"
import { useOutletContext } from "react-router"

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
        <div>
            <h1></h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" />
                </p>
                <p>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </p>
                <button type="submit">Login</button>
            </form>
            <p>Not a member? <a href="/register">Create an account.</a></p>
        </div>
    )
}