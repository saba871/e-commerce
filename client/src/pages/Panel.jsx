import { useState } from "react"
import { useAuth } from "../context/auth.context"
import { useItem } from "../context/item.context"

const Panel = () => {
    const { user } = useAuth()
    const { addItem } = useItem()

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
        sizes: "",
        colors: "",
        inStock: false,
    })

    if (!user) {
        return <p className="px-4 py-16 text-center text-slate-500">Loading...</p>
    }

    const isAdmin = user.isAdmin === true

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const itemData = {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
            category: formData.category,
            inStock: formData.inStock,
            image: formData.image
                .split(",")
                .map((img) => img.trim())
                .filter(Boolean),
            sizes: formData.sizes
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            colors: formData.colors
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean),
        }

        await addItem(itemData)

        setFormData({
            name: "",
            price: "",
            description: "",
            image: "",
            category: "",
            sizes: "",
            colors: "",
            inStock: false,
        })
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
            <section className="glass-panel mb-12 grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                    <p className="tag-pill">Account</p>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{user.name}</h1>
                    <p className="text-slate-500">{user.email}</p>
                    <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
                        {isAdmin ? "Studio Director" : "Private Client"}
                    </p>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white">
                    <p className="text-sm uppercase tracking-[0.4em] text-white/60">Status</p>
                    <p className="mt-4 text-2xl font-semibold">{isAdmin ? "Admin access unlocked" : "Client access"}</p>
                    <p className="mt-3 text-white/70">
                        {isAdmin ? "You can curate new pieces for upcoming drops." : "Contact your stylist for bespoke recommendations."}
                    </p>
                </div>
            </section>

            {isAdmin ? (
                <section className="glass-panel">
                    <div className="flex flex-col gap-3 pb-8">
                        <p className="tag-pill">Studio tools</p>
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Add new item</h2>
                        <p className="text-slate-500">
                            Upload imagery, describe fabrication details, and set inventory availability. This automatically updates the catalog.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                                <input type="text" name="name" placeholder="Item name" value={formData.name} onChange={handleChange} required className="input-field" />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Price</label>
                                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="input-field" />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                                <input type="text" name="category" placeholder="Outerwear" value={formData.category} onChange={handleChange} required className="input-field" />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Image URLs</label>
                                <input type="text" name="image" placeholder="Comma separated URLs" value={formData.image} onChange={handleChange} className="input-field" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                                <textarea name="description" placeholder="Describe fabrication, fit, and details" value={formData.description} onChange={handleChange} className="input-field min-h-[140px]" />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Sizes</label>
                                <input type="text" name="sizes" placeholder="XS, S, M" value={formData.sizes} onChange={handleChange} className="input-field" />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Colors</label>
                                <input type="text" name="colors" placeholder="Charcoal, Bone" value={formData.colors} onChange={handleChange} className="input-field" />
                            </div>

                            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                                In stock
                            </label>

                            <button type="submit" className="primary-btn w-full">Publish item</button>
                        </div>
                    </form>
                </section>
            ) : (
                <section className="glass-panel text-center text-slate-500">
                    <p>Only administrators can access the studio upload panel.</p>
                </section>
            )}
        </main>
    )
}

export default Panel
