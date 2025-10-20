import { verifyUrl, loginUrl } from "./url"

export async function verifyToken() {
    try {
        const token = localStorage.getItem("token")
        if (!token) return null
        const response = await fetch(verifyUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (!response.ok) {
            throw new Error("Token verification failed")
        }
        const obj = await response.json()
        return obj.user
    } catch(err) {
        console.log("Error at verifyToken: ", err)
        return null
    }
}

export async function getToken(username, password) {
    try {
        const response = await fetch(loginUrl, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                "Content-Type": 'application/json',
            }
        })
        if (!response.ok) {
            throw new Error("Fetching token failed")
        }
        const obj = await response.json()
        return obj.token
    } catch(err) {
        console.log("Error at getToken", err)
    }
}
