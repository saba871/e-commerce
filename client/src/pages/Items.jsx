import { useItem } from "../context/item.context"
import { useAuth } from "../context/auth.context"
import { useCart } from "../context/cart.context"
import { useState } from "react"
import { useNavigate } from "react-router-dom" // დავამატოთ ნავიგაცია

const Items = () => {
    const { items, deleteItem, updateItem } = useItem()
    const { user } = useAuth()
    const { addToCart } = useCart()
    const navigate = useNavigate()

    const isAdmin = user?.isAdmin === true
    const [selectedQuantities, setSelectedQuantities] = useState({})

    // 1. სტეიტი რედაქტირებისთვის
    const [editingItem, setEditingItem] = useState(null)

    const handleQuantityChange = (id, quantity) => {
        setSelectedQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, Math.min(quantity, 10)),
        }))
    }

    const handleAddToCart = (item) => {
        // 2. შემოწმება: თუ იუზერი არაა, გადავიდეს ლოდინზე
        if (!user) {
            navigate("/login")
            return
        }
        const quantity = selectedQuantities[item._id] ?? 1
        addToCart(item, quantity)
    }

    // 3. ფორმის Submit ფუნქცია
    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const updatedData = {
            name: formData.get("name"),
            price: Number(formData.get("price")),
            description: formData.get("description"),
            inStock: formData.get("inStock") === "true"
        }

        await updateItem(editingItem._id, updatedData)
        setEditingItem(null)
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
            {editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <form onSubmit={handleUpdateSubmit} className="glass-panel w-full max-w-md bg-white p-8 space-y-4 shadow-2xl rounded-3xl">
                        <h2 className="text-2xl font-bold">Edit Product</h2>
                        <input name="name" defaultValue={editingItem.name} placeholder="სახელი" className="w-full border rounded-xl p-3" required />
                        <input name="price" type="number" defaultValue={editingItem.price} placeholder="ფასი" className="w-full border rounded-xl p-3" required />
                        <textarea name="description" defaultValue={editingItem.description} placeholder="აღწერა" className="w-full border rounded-xl p-3" rows="3" />
                        <select name="inStock" defaultValue={editingItem.inStock} className="w-full border rounded-xl p-3">
                            <option value="true">In Stock</option>
                            <option value="false">Waitlist</option>
                        </select>
                        <div className="flex gap-4 pt-2">
                            <button type="submit" className="primary-btn flex-1">Save</button>
                            <button type="button" onClick={() => setEditingItem(null)} className="secondary-btn flex-1 text-slate-500">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <header className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="tag-pill">Curated catalog</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Limited-run pieces</h1>
                    <p className="mt-3 max-w-2xl text-slate-500">
                        Every garment undergoes a 72-hour finishing process with ateliers in Milan.
                    </p>
                </div>
                {isAdmin && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Admin view</p>}
            </header>

            {items.length === 0 ? (
                <div className="glass-panel text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Currently unavailable</p>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <article key={item._id} className="glass-panel flex flex-col gap-4">
                            <div className="relative overflow-hidden rounded-2xl">
                                <img src={item.image[0]} alt={item.name} className="h-72 w-full rounded-2xl object-cover" />
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

                                <div className="mt-auto space-y-4 pt-4">
                                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 p-3">
                                        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Quantity</span>
                                        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2">
                                            <button onClick={() => handleQuantityChange(item._id, (selectedQuantities[item._id] ?? 1) - 1)}>-</button>
                                            <span className="text-sm font-semibold">{selectedQuantities[item._id] ?? 1}</span>
                                            <button onClick={() => handleQuantityChange(item._id, (selectedQuantities[item._id] ?? 1) + 1)}>+</button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="primary-btn w-full"
                                        disabled={!item.inStock && user} // მხოლოდ იმ შემთხვევაში დაიბლოკოს თუ მარაგი არაა და იუზერი შესულია
                                    >
                                        {!user ? "Log in to buy" : (item.inStock ? "Add to cart" : "Join waitlist")}
                                    </button>
                                </div>

                                {isAdmin && (
                                    <div className="flex gap-3 pt-2">
                                        {/* ფუნქციის ნაცვლად ახლა ობიექტს ვსეტავთ */}
                                        <button className="secondary-btn flex-1" onClick={() => setEditingItem(item)}>
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
