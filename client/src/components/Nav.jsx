import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../context/auth.context"
import { useState } from "react" // დავამატეთ useState
import CartBadge from "./CartBadge"
import { Menu, X } from "lucide-react" // npm install lucide-react

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/items", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
]

const Nav = () => {
    const { user, logout } = useAuth()
    const [isOpen, setIsOpen] = useState(false) // მენიუს სტეიტი
    const isAdmin = user?.isAdmin === true

    return (
        <header className="reveal sticky top-4 z-50 mx-auto w-[95%] max-w-7xl">
            <div className="glass-panel flex items-center justify-between !py-4 !px-8 relative">
                
                {/* Logo */}
                <Link to="/" className="group flex items-center gap-2 text-xl font-black tracking-tighter text-slate-900 z-[60]">
                    <span className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center transition-transform group-hover:rotate-12">L</span>
                    LUMEN<span className="text-slate-400 font-light">.</span>
                </Link>

                {/* Desktop Navigation */}
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

                {/* Right Side Actions */}
                <div className="flex items-center gap-4 md:gap-6 z-[60]">
                    <CartBadge />

                    <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                <NavLink to="/panel" className="secondary-btn !py-2">Studio Panel</NavLink>
                                <button onClick={logout} className="text-xs font-bold text-red-500 hover:underline uppercase tracking-widest">Exit</button>
                            </>
                        ) : (
                            <Link to="/login" className="primary-btn !py-2.5 !px-6 !text-[12px]">Access Studio</Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 md:hidden text-slate-900 transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-xl transition-all duration-500 md:hidden z-[50] ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                }`}>
                    <div className="flex flex-col items-center justify-center h-full gap-8 text-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-bold text-slate-900 hover:text-slate-500 transition-colors"
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        
                        <div className="h-[1px] w-24 bg-slate-200 my-4" />

                        {user ? (
                            <div className="flex flex-col gap-6">
                                <NavLink to="/panel" onClick={() => setIsOpen(false)} className="text-2xl font-medium">Studio Panel</NavLink>
                                <button onClick={() => {logout(); setIsOpen(false)}} className="text-red-500 font-bold text-lg">Exit</button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="primary-btn !text-lg !py-4 !px-10">Access Studio</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Nav
