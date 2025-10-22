import style from "./Users.module.css"
import { fetchUsers } from "../../api/fetch"
import { useEffect, useState } from "react"
import { deleteUser } from "../../api/update"

export default function Users() {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)

    function handleClick(userId) {
        const callback = async () => {
            try {
                await deleteUser(userId)
                window.location.reload()
            } catch(err) {
                console.log("Error at Users in handleClick: ", err)
            }
        }   
        callback()
    }

    useEffect(() => {
        const callback = async () => {
            try {
                const arr = await fetchUsers()
                setUsers(arr)
                setLoading(false)
            } catch(err) {
                console.log("Error at Users: ", err)
            }
        }
        callback()
    }, [])

    if (isLoading) {
        return (
            <div>
                <h1>Users</h1>
                <h2 className={style.loading}>Loading Users...</h2>
            </div>
        )
    } else {
        return (
            <div className={style.container}>
                <h1>Users</h1>
                <table className={style.usersContainer}>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Users</th>
                            <th scope="col">Role</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr>
                                    <td className={style.id}>{user.id}</td>
                                    <td className={style.username}>{user.username}</td>
                                    { user.isWriter 
                                        ? <td className={style.role}>Admin</td>
                                        : <td className={style.role}>Member</td>
                                    }
                                    <td className={style.delete} onClick={() => {handleClick(user.id)}}><button>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}