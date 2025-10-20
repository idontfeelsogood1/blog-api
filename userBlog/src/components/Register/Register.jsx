import { registerUser } from "../../api/auth"
import { useNavigate } from "react-router"

export default function Register() {
    const navigate = useNavigate()

    function handleSubmit(event) {
        const username = event.target.username.value
        const password = event.target.password.value

        const callback = async () => {
            try {
                await registerUser(username, password)
                navigate("/login")
            } catch(err) {
                console.log("Error at Register", err)
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
                <button type="submit">Register</button>
            </form>
            <a href="/register">Login if you have an account.</a>
        </div>
    )
}