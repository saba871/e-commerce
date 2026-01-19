import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import LogIn from "./pages/Login"
import Register from "./pages/Register"
import Panel from "./pages/Panel"
import Items from "./pages/Items"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Success from "./pages/Success"
import CartDrawer from "./components/CartDrawer"

function App() {
    return (
        <div className="min-h-screen bg-stone-50">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/items" element={<Items />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/panel" element={<Panel />} />
                <Route path="/success" element={<Success />} />
            </Routes>
            <CartDrawer />
        </div>
    )
}

export default App
