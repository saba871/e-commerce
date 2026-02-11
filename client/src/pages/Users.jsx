import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { motion, AnimatePresence } from "framer-motion";

const Users = () => {
    const { allUser, getAllUser, deleteUser, changeUser } = useAuth();
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "" });

    useEffect(() => {
        getAllUser();
    }, [getAllUser]);

    const hasUsers = Array.isArray(allUser) && allUser.length > 0;

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto w-full max-w-[1600px] px-6 py-16 sm:px-10 lg:px-20 min-h-screen"
        >
            {/* --- HEADER --- */}
            <header className="mb-16 flex flex-col gap-6 border-b border-slate-100 pb-12 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-4">
                    <span className="tag-pill">Admin Control</span>
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 sm:text-6xl">
                        User <span className="text-slate-400 italic font-light">Directory.</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-xl font-medium">
                        Manage your community, review roles, and control access permissions from one central hub.
                    </p>
                </div>
                <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Members</p>
                    <p className="text-2xl font-black text-slate-900">{allUser?.length || 0}</p>
                </div>
            </header>

            {/* --- USERS GRID --- */}
            {hasUsers ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {allUser.map((user, index) => (
                        <motion.article
                            key={user._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 transition-all hover:shadow-xl hover:border-slate-200"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-xl font-bold text-white shadow-lg">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold tracking-tight text-slate-900">{user.name}</p>
                                        <p className="text-sm font-medium text-slate-400">{user.email}</p>
                                    </div>
                                </div>
                                <span className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                                    user.isAdmin ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"
                                }`}>
                                    {user.isAdmin ? "Admin" : "Client"}
                                </span>
                            </div>

                            <div className="mt-10 flex gap-3">
                                <button
                                    onClick={() => {
                                        setEditingUser(user);
                                        setFormData({ name: user.name, email: user.email });
                                    }}
                                    className="flex-1 rounded-xl border border-slate-100 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => deleteUser(user._id)}
                                    className="flex-1 rounded-xl bg-red-50 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 transition-all hover:bg-red-500 hover:text-white"
                                >
                                    Revoke Access
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            ) : (
                <div className="glass-panel py-32 text-center border-dashed border-2">
                    <p className="text-sm font-bold uppercase tracking-[0.4em] text-slate-300">No members registered yet</p>
                </div>
            )}

            {/* --- UPDATE MODAL --- */}
            <AnimatePresence>
                {editingUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-md rounded-[2.5rem] bg-white p-10 shadow-2xl border-none"
                        >
                            <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-2">Update Member</h2>
                            <p className="text-sm text-slate-500 mb-8">Modify contact details for {editingUser.name}.</p>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    changeUser(editingUser._id, formData);
                                    setEditingUser(null);
                                }}
                                className="space-y-5"
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input-field h-14"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="input-field h-14"
                                        placeholder="Email Address"
                                    />
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setEditingUser(null)}
                                        className="flex-1 h-14 rounded-xl border border-slate-100 text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 h-14 rounded-xl bg-slate-900 text-xs font-bold uppercase tracking-widest text-white hover:bg-slate-800 transition-shadow shadow-lg shadow-slate-200"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    );
};

export default Users;
