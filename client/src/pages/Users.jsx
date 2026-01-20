import { useEffect } from "react"
import { useAuth } from "../context/auth.context"


const Users = () => {
c
    const { allUser, getAllUser } = useAuth()

    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <div style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", padding: "40px", color: "#f5f5f5" }}>
            <h1 style={{ textAlign: "center", marginBottom: "30px", letterSpacing: "2px", fontWeight: "600" }}>All Users</h1>

            {
                allUser && allUser.length > 0 ? (
                    allUser.map((u) => (
                        <div
                            key={u._id}
                            style={{
                                border: "1px solid #1f1f1f",
                                margin: "15px auto",
                                padding: "20px",
                                maxWidth: "600px",
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #050505, #1a1a1a)",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
                            }}
                        >
                            <p style={{ fontSize: "1.2rem", marginBottom: "6px", fontWeight: "600" }}>{u.name}</p>
                            <p style={{ marginBottom: "6px", color: "#bbbbbb" }}>{u.isAdmin ? "Admin" : "User"}</p>
                            <p style={{ marginBottom: "15px", color: "#b5b5b5" }}>{u.email}</p>

                            <div style={{ display: "flex", gap: "12px" }}>
                                <button
                                    type="button"
                                    style={{
                                        flex: 1,
                                        padding: "10px 0",
                                        borderRadius: "8px",
                                        border: "1px solid #fff",
                                        backgroundColor: "transparent",
                                        color: "#fff",
                                        letterSpacing: "1px",
                                        cursor: "pointer",
                                        textTransform: "uppercase",
                                        fontWeight: 600,
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    style={{
                                        flex: 1,
                                        padding: "10px 0",
                                        borderRadius: "8px",
                                        border: "none",
                                        backgroundColor: "#ff1a1a",
                                        color: "#fff",
                                        letterSpacing: "1px",
                                        cursor: "pointer",
                                        textTransform: "uppercase",
                                        fontWeight: 600,
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", color: "#b5b5b5" }}>Users not found</p>
                )
            }
        </div>
    )
}

export default Users
