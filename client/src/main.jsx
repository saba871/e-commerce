import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/auth.context.jsx'
import { ItemProvider } from './context/item.context.jsx'
import { CartProvider } from "./context/cart.context.jsx"


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
        <AuthProvider>
            <ItemProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </ItemProvider>
        </AuthProvider>
  </BrowserRouter>,
)
