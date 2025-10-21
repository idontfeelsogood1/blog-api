import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";

export default function Logout() {
    const [user, setUser] = useOutletContext()
    const navigate = useNavigate()
    localStorage.removeItem("token")
    setUser(null)
    navigate("/login")
}