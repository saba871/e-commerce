import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../context/auth.context"
import CartBadge from "./CartBadge"

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/items", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
]

const Nav = () => {
    const { user, logout } = useAuth()
    const isAdmin = user?.isAdmin === true

    return (
        // Changed to a floating-style glass header with reveal animation
        <header className="reveal sticky top-4 z-50 mx-auto w-[95%] max-w-7xl">
            <div className="glass-panel flex items-center justify-between !py-4 !px-8">
                {/* Logo: Removed heavy tracking for a cleaner, modern bold look */}
                <Link to="/" className="group flex items-center gap-2 text-xl font-black tracking-tighter text-slate-900">
                    <span className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center transition-transform group-hover:rotate-12">L</span>
                    LUMEN<span className="text-slate-400 font-light">.</span>
                </Link>

                {/* Navigation: Removed all-caps, used medium weight for sophistication */}
                <nav className="hidden items-center gap-10 text-[13px] font-medium text-slate-500 md:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `relative transition-all duration-300 hover:text-slate-900
                                ${isActive ? "text-slate-900 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-slate-900" : ""}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    {isAdmin && (
                        <NavLink to="/users" className="tag-pill hover:bg-slate-900 hover:text-white transition-colors">
                            Admin Portal
                        </NavLink>
                    )}
                </nav>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                         <CartBadge />
                    </div>

                    <div className="h-6 w-[1px] bg-slate-200 hidden md:block" /> {/* Elegant Divider */}

                    {user ? (
                        <div className="flex items-center gap-3">
                            <NavLink to="/panel" className="secondary-btn !py-2">
                                Studio Panel
                            </NavLink>
                            <button onClick={logout} className="text-xs font-bold text-red-500 hover:underline uppercase tracking-widest transition-opacity">
                                Exit
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="primary-btn !py-2.5 !px-6 !text-[12px]">
                            Access Studio
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Nav
