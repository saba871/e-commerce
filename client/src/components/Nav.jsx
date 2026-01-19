import { Link } from "react-router-dom"
import { useAuth } from "../context/auth.context"

const Nav = () => {
    const { user, logout } = useAuth()
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/items">Items</Link></li>
                    {
                        user ? (<li><Link to="/panel">Panel</Link></li>) : null
                    }
                    {
                        user ? (<li><button onClick={logout}>Logout</button></li>) : null
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Nav
