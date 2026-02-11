import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { useItem } from "../context/item.context";
import { motion } from "framer-motion";

const Panel = () => {
    const { user } = useAuth();
    const { addItem } = useItem();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
        sizes: "",
        colors: "",
        inStock: false,
    });

    if (!user) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
            </div>
        );
    }

    const isAdmin = user.isAdmin === true;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemData = {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
            category: formData.category,
            inStock: formData.inStock,
            image: formData.image.split(",").map((img) => img.trim()).filter(Boolean),
            sizes: formData.sizes.split(",").map((s) => s.trim()).filter(Boolean),
            colors: formData.colors.split(",").map((c) => c.trim()).filter(Boolean),
        };

        await addItem(itemData);
        setFormData({ name: "", price: "", description: "", image: "", category: "", sizes: "", colors: "", inStock: false });
    };

    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto w-full max-w-[1600px] px-6 py-16 sm:px-10 lg:px-20"
        >
            {/* --- USER PROFILE HEADER --- */}
            <section className="mb-16 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <span className="tag-pill w-fit text-[10px]">Management Terminal</span>
                    <h1 className="mt-6 text-6xl font-black tracking-tighter text-slate-900 sm:text-7xl">
                        {user.name.split(' ')[0]} <span className="text-slate-400 italic font-light">Lumen.</span>
                    </h1>
                    <p className="mt-4 text-xl text-slate-500 font-medium">{user.email}</p>
                </div>

                <div className="lg:col-span-5">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl">
                        <div className="relative z-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Access Level</p>
                            <p className="mt-6 text-3xl font-bold tracking-tight">
                                {isAdmin ? "Studio Director" : "Private Client"}
                            </p>
                            <p className="mt-4 text-lg text-white/60 leading-relaxed font-light">
                                {isAdmin
                                    ? "Global creative control enabled. You can curate new pieces and manage studio inventory."
                                    : "Limited access. Please contact your concierge for boutique elevation."}
                            </p>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                    </div>
                </div>
            </section>

            {/* --- ADMIN FORM SECTION --- */}
            {isAdmin ? (
                <section className="rounded-[3rem] bg-slate-50/50 p-8 sm:p-12 lg:p-16 border border-slate-100">
                    <div className="mb-12 max-w-2xl">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Archive Creation</h2>
                        <p className="mt-4 text-lg text-slate-500">
                            Fill in the technical specifications below to register a new garment in the Lumen digital archive.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
                        {/* LEFT COLUMN: BASIC INFO */}
                        <div className="space-y-6">
                            <div className="group space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-slate-900 transition-colors">Garment Name</label>
                                <input type="text" name="name" placeholder="e.g. Oversized Mohair Blazer" value={formData.name} onChange={handleChange} required className="input-field h-14" />
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price (USD)</label>
                                    <input type="number" name="price" placeholder="1200" value={formData.price} onChange={handleChange} required className="input-field h-14" />
                                </div>
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                                    <input type="text" name="category" placeholder="Outerwear" value={formData.category} onChange={handleChange} required className="input-field h-14" />
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Imagery (Comma Separated URLs)</label>
                                <textarea name="image" placeholder="https://image1.jpg, https://image2.jpg" value={formData.image} onChange={handleChange} className="input-field min-h-[120px] py-4 resize-none" />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: TECHNICAL DETAILS */}
                        <div className="space-y-6">
                            <div className="group space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fabrication & Narrative</label>
                                <textarea name="description" placeholder="Describe the silhouette, fabric origin, and craftsmanship..." value={formData.description} onChange={handleChange} className="input-field min-h-[148px] py-4 resize-none" />
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Available Sizes</label>
                                    <input type="text" name="sizes" placeholder="XS, S, M, L" value={formData.sizes} onChange={handleChange} className="input-field h-14" />
                                </div>
                                <div className="group space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Color Palette</label>
                                    <input type="text" name="colors" placeholder="Onyx, Pearl, Sand" value={formData.colors} onChange={handleChange} className="input-field h-14" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <div className="relative">
                                        <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="sr-only" />
                                        <div className={`h-6 w-11 rounded-full transition-colors ${formData.inStock ? 'bg-slate-900' : 'bg-slate-200'}`} />
                                        <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${formData.inStock ? 'translate-x-5' : ''}`} />
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-widest text-slate-700">Immediate Availability</span>
                                </label>

                                <button type="submit" className="primary-btn px-12 h-14 w-full sm:w-auto">
                                    Publish to Catalog
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            ) : (
                <section className="rounded-[3rem] bg-red-50/50 p-20 text-center border border-red-100">
                    <p className="text-sm font-black uppercase tracking-[0.4em] text-red-400">Restricted Access</p>
                    <p className="mt-4 text-xl text-red-900/60 font-medium">Only administrators can access the studio upload terminal.</p>
                </section>
            )}
        </motion.main>
    );
};

export default Panel;
