import { useEffect } from "react"
import { useAuth } from "../context/auth.context"


const Users = () => {

    const { allUser, getAllUser } = useAuth()

    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <div>
            <h1>All Users</h1>

            {
                allUser && allUser.length > 0 ? (
                    allUser.map((u) => (
                        <div key={u._id} style={{ border: '1px solid #ddd', margin: '10px' }}>
                            <p>{u.name}</p>
                            <p>{u.email}</p>
                        </div>
                    ))
                ) : (
                    <p>Users not found</p>
                )
            }
        </div>
    )
}

export default Users
