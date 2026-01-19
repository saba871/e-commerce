import { useCart } from "../context/cart.context"

const CartBadge = () => {
    const { cartCount, toggleCart } = useCart()

    return (
        <button
            onClick={() => toggleCart(true)}
            className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm transition hover:border-slate-900 hover:bg-white"
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                <path d="M3 3h2l3.6 9.59a2 2 0 0 0 1.9 1.41h7.1a2 2 0 0 0 1.92-1.54l1.38-6.21H7" />
                <circle cx="10.5" cy="20" r="1.5" />
                <circle cx="17.5" cy="20" r="1.5" />
            </svg>
            Cart
            <span className="ml-1 inline-flex min-w-[1.75rem] items-center justify-center rounded-full bg-slate-900 px-2 py-0.5 text-[0.7rem] text-white">
                {cartCount}
            </span>
        </button>
    )
}

export default CartBadge
