import { useNavigate } from "react-router-dom"
import { useCart } from "../context/cart.context"

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value ?? 0)

const CartDrawer = () => {
    const navigate = useNavigate()
    const { cartItems, cartTotal, isCartOpen, toggleCart, updateQuantity, removeFromCart, clearCart } = useCart()

    return (
        <div
            className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white/95 backdrop-blur-xl shadow-2xl transition duration-300 ease-in-out ${
                isCartOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Your Cart</p>
                        <p className="text-lg font-semibold text-slate-900">{cartItems.length} curated pieces</p>
                    </div>
                    <button
                        onClick={() => toggleCart(false)}
                        className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-900 hover:text-slate-900"
                    >
                        <span className="sr-only">Close cart</span>
                        ✕
                    </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                    {cartItems.length === 0 ? (
                        <div className="glass-panel bg-white/60 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Empty cart</p>
                            <p className="mt-3 text-slate-500">Add pieces to craft your look.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="glass-panel flex gap-4 bg-white/70">
                                <div className="h-24 w-24 overflow-hidden rounded-2xl">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.category}</p>
                                            <p className="text-lg font-semibold text-slate-900">{item.name}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-xs uppercase tracking-[0.2em] text-slate-400 transition hover:text-slate-900"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-1">
                                            <button
                                                className="text-lg font-semibold text-slate-500 transition hover:text-slate-900"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                −
                                            </button>
                                            <span className="text-sm font-semibold text-slate-900">{item.quantity}</span>
                                            <button
                                                className="text-lg font-semibold text-slate-500 transition hover:text-slate-900"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="text-lg font-semibold text-slate-900">
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t border-slate-100 bg-white/80 px-6 py-6">
                    <div className="flex items-center justify-between text-sm uppercase tracking-[0.25em] text-slate-500">
                        <span>Subtotal</span>
                        <span className="text-lg text-slate-900">{formatCurrency(cartTotal)}</span>
                    </div>
                    <button
                        onClick={() => {
                            if (cartItems.length === 0) return
                            clearCart()
                            toggleCart(false)
                            navigate("/success")
                        }}
                        disabled={cartItems.length === 0}
                        className="primary-btn mt-5 w-full disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        Proceed to checkout
                    </button>
                    <button
                        onClick={clearCart}
                        disabled={cartItems.length === 0}
                        className="secondary-btn mt-3 w-full text-xs disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Clear cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartDrawer
