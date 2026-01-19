import { useItem } from "../context/item.context"
import { useAuth } from "../context/auth.context"
import { useCart } from "../context/cart.context"
import { useState } from "react"

const Items = () => {
    const { items, deleteItem, updateItem } = useItem()
    const { user } = useAuth()
    const { addToCart } = useCart()
    const isAdmin = user?.isAdmin === true
    const [selectedQuantities, setSelectedQuantities] = useState({})

    const handleQuantityChange = (id, quantity) => {
        setSelectedQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, Math.min(quantity, 10)),
        }))
    }

    const handleAddToCart = (item) => {
        const quantity = selectedQuantities[item._id] ?? 1
        addToCart(item, quantity)
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
            <header className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="tag-pill">Curated catalog</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Limited-run pieces</h1>
                    <p className="mt-3 max-w-2xl text-slate-500">
                        Every garment undergoes a 72-hour finishing process with ateliers in Milan, ensuring sculpted structure and enduring wear.
                    </p>
                </div>
                {isAdmin && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Admin view</p>}
            </header>

            {items.length === 0 ? (
                <div className="glass-panel text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Currently unavailable</p>
                    <p className="mt-2 text-lg text-slate-500">No items found. Check back soon.</p>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <article key={item._id} className="glass-panel tilt-hover flex flex-col gap-4">
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src={item.image[0]}
                                    alt={item.name}
                                    className="h-72 w-full rounded-2xl object-cover"
                                />
                                <span className={`tag-pill absolute left-4 top-4 ${item.inStock ? "bg-white/90" : "bg-red-50 text-red-600"}`}>
                                    {item.inStock ? "In Stock" : "Waitlist"}
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                                    <p className="text-lg font-semibold text-slate-900">${item.price}</p>
                                </div>
                                <p className="text-sm text-slate-500">{item.description}</p>
                                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-slate-500">
                                    <span className="tag-pill">{item.category}</span>
                                    <span className="tag-pill">Sizes: {item.sizes.join(", ")}</span>
                                    <span className="tag-pill">Colors: {item.colors.join(", ")}</span>
                                </div>

                                <div className="mt-auto space-y-4 pt-4">
                                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 p-3">
                                        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Quantity</span>
                                        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2">
                                            <button
                                                className="text-lg font-semibold text-slate-500 transition hover:text-slate-900"
                                                onClick={() => handleQuantityChange(item._id, (selectedQuantities[item._id] ?? 1) - 1)}
                                            >
                                                −
                                            </button>
                                            <span className="text-sm font-semibold text-slate-900">
                                                {selectedQuantities[item._id] ?? 1}
                                            </span>
                                            <button
                                                className="text-lg font-semibold text-slate-500 transition hover:text-slate-900"
                                                onClick={() => handleQuantityChange(item._id, (selectedQuantities[item._id] ?? 1) + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="primary-btn w-full"
                                        disabled={!item.inStock}
                                    >
                                        {item.inStock ? "Add to cart" : "Join waitlist"}
                                    </button>
                                </div>

                                {isAdmin && (
                                    <div className="flex gap-3 pt-2">
                                        <button className="secondary-btn flex-1" onClick={() => updateItem(item._id)}>
                                            Update
                                        </button>
                                        <button className="secondary-btn flex-1 border-red-200 text-red-600" onClick={() => deleteItem(item._id)}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    )
}

export default Items
