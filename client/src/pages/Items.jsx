import { motion, AnimatePresence } from "framer-motion";
import { useItem } from "../context/item.context";
import { useAuth } from "../context/auth.context";
import { useCart } from "../context/cart.context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Items = () => {
    const { items, deleteItem, updateItem } = useItem();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const isAdmin = user?.isAdmin === true;
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [editingItem, setEditingItem] = useState(null);

    const handleQuantityChange = (id, quantity) => {
        setSelectedQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, Math.min(quantity, 10)),
        }));
    };

    const handleAddToCart = (item) => {
        if (!user) {
            navigate("/login");
            return;
        }
        const quantity = selectedQuantities[item._id] ?? 1;
        addToCart(item, quantity);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = {
            name: formData.get("name"),
            price: Number(formData.get("price")),
            description: formData.get("description"),
            inStock: formData.get("inStock") === "true"
        };
        await updateItem(editingItem._id, updatedData);
        setEditingItem(null);
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto w-full max-w-[1600px] px-6 py-16 sm:px-10 lg:px-20"
        >
            {/* --- EDIT MODAL --- */}
            <AnimatePresence>
                {editingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
                    >
                        <motion.form
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            onSubmit={handleUpdateSubmit}
                            className="glass-panel w-full max-w-lg bg-white p-10 space-y-6 shadow-2xl rounded-[2.5rem] border-none"
                        >
                            <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
                            <div className="space-y-4">
                                <input name="name" defaultValue={editingItem.name} placeholder="Product Name" className="input-field h-14" required />
                                <input name="price" type="number" defaultValue={editingItem.price} placeholder="Price" className="input-field h-14" required />
                                <textarea name="description" defaultValue={editingItem.description} placeholder="Description" className="input-field resize-none p-4" rows="4" />
                                <select name="inStock" defaultValue={editingItem.inStock} className="input-field h-14">
                                    <option value="true">Available Now</option>
                                    <option value="false">Waitlist Only</option>
                                </select>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="primary-btn flex-1 h-14">Save Changes</button>
                                <button type="button" onClick={() => setEditingItem(null)} className="secondary-btn flex-1 h-14">Cancel</button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- HEADER --- */}
            <header className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between border-b border-slate-100 pb-12">
                <div className="max-w-3xl">
                    <span className="tag-pill">Curated Catalog</span>
                    <h1 className="mt-6 text-5xl font-black tracking-tighter text-slate-900 sm:text-7xl">
                        Limited-run <span className="text-slate-400 italic font-light">pieces.</span>
                    </h1>
                    <p className="mt-6 text-lg text-slate-500 leading-relaxed font-medium">
                        Every garment undergoes a 72-hour finishing process with ateliers in Milan, ensuring architectural precision in every stitch.
                    </p>
                </div>
                {isAdmin && (
                    <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Admin Privileges Active</p>
                    </div>
                )}
            </header>

            {/* --- PRODUCT GRID --- */}
            {items.length === 0 ? (
                <div className="glass-panel py-32 text-center border-dashed border-2">
                    <p className="text-sm font-bold uppercase tracking-[0.4em] text-slate-300">Archive currently empty</p>
                </div>
            ) : (
                <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((item) => (
                        <motion.article
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                                <img
                                    src={item.image[0]}
                                    alt={item.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                                <span className={`absolute left-6 top-6 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md ${
                                    item.inStock ? "bg-white/90 text-slate-900" : "bg-red-500/90 text-white"
                                }`}>
                                    {item.inStock ? "Ready to ship" : "Waitlist"}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="mt-8 flex flex-1 flex-col px-2">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-slate-600 transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-lg font-medium text-slate-900">${item.price}</p>
                                </div>
                                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
                                    {item.description}
                                </p>

                                {/* Interactive Section */}
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-2">
                                        <span className="ml-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Qty</span>
                                        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-3 py-1">
                                            <button
                                                className="text-lg text-slate-400 hover:text-black transition-colors"
                                                onClick={() => handleQuantityChange(item._id, (selectedQuantities[item._id] ?? 1) - 1)}
                                            >-</button>
                                            <span className="min-w-[20px] text-center text-sm font-bold">{selectedQuantities[item._id] ?? 1}</span>
                                            <button
                                                className="text-lg text-slate-400 hover:text-black transition-colors"
                                                onClick={() => handleQuantityChange(item._id, (selectedQuantities[item._id] ?? 1) + 1)}
                                            >+</button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className={`primary-btn w-full h-14 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
                                            !item.inStock && user ? "opacity-50 grayscale" : ""
                                        }`}
                                        disabled={!item.inStock && user}
                                    >
                                        {!user ? "Login to Purchase" : (item.inStock ? "Add to Collection" : "Join Waitlist")}
                                    </button>
                                </div>

                                {/* Admin Controls */}
                                {isAdmin && (
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            className="flex-1 rounded-xl border border-slate-200 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                                            onClick={() => setEditingItem(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="flex-1 rounded-xl border border-red-100 py-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                            onClick={() => deleteItem(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}
        </motion.main>
    );
};

export default Items;
