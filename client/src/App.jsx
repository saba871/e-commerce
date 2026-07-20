import { Route, Routes } from 'react-router-dom'
import CartDrawer from './components/CartDrawer'
import Nav from './components/Nav'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Items from './pages/Items'
import LogIn from './pages/Login'
import Panel from './pages/Panel'
import Register from './pages/Register'
import Success from './pages/Success'
import Users from './pages/Users'

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
				<Route path="/users" element={<Users />} />
			</Routes>
			<CartDrawer />
		</div>
	)
}

export default App
