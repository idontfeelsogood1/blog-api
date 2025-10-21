import { registerUser } from "../../api/auth"
import { useNavigate } from "react-router"
import style from "./Register.module.css"

export default function Register() {
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
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
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <p>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </p>
                <button type="submit">Register</button>
                <p><a href="/login">Login</a> if you have an account.</p>
            </form>
        </div>
    )
}