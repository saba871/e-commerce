import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../context/auth.context"
import CartBadge from "./CartBadge"

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/items", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/users", label: "Users" },
]

const authLinks = [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
]

const Nav = () => {
    const { user, logout } = useAuth()

    const isAdmin = user && user.isAdmin === true

    return (
        <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
                <Link to="/" className="text-lg font-semibold tracking-[0.35em] text-slate-900">
                    LUMEN
                </Link>

                <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 md:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `transition hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-500"}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    {isAdmin && (
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                `transition hover:text-slate-900 ${isActive ? "text-slate-900" : "text-slate-500"}`
                            }
                        >
                            Users
                        </NavLink>
                    )}
                </nav>

                <div className="flex items-center gap-3">
                    <CartBadge />
                    {!user && (
                        <div className="hidden gap-3 md:flex">
                            {authLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `text-xs font-semibold uppercase tracking-[0.2em] transition ${isActive ? "text-slate-900" : "text-slate-500"}`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    )}

                    {user && (
                        <>
                            <NavLink to="/panel" className="secondary-btn">
                                Studio Panel
                            </NavLink>
                            <button onClick={logout} className="secondary-btn">
                                Logout
                            </button>
                        </>
                    )}

                    {!user && (
                        <Link to="/login" className="primary-btn hidden md:inline-flex">
                            Access Studio
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Nav
