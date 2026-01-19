import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import LogIn from "./pages/Login"
import Register from "./pages/Register"
import Panel from "./pages/Panel"
import Items from "./pages/Items"
import CartDrawer from "./components/CartDrawer"

function App() {
    return (
        <div className="min-h-screen bg-stone-50">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/items" element={<Items />} />
                <Route path="/panel" element={<Panel />} />
            </Routes>
            <CartDrawer />
        </div>
    )
}

export default App
