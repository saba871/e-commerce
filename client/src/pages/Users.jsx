import { useEffect, useState } from "react"
import { useAuth } from "../context/auth.context"

const Users = () => {
    const { allUser, getAllUser, deleteUser, changeUser } = useAuth()

    const [editingUser, setEditingUser] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    })

    useEffect(() => {
        getAllUser()
    }, [getAllUser])

    const hasUsers = Array.isArray(allUser) && allUser.length > 0

    return (
        <>
            <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-12">
                <div className="mx-auto max-w-5xl space-y-10">
                    <header className="flex flex-col gap-4 text-center">
                        <p className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-slate-200 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                            User Directory
                        </p>

                        <div className="space-y-3">
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                All Users
                            </h1>
                            <p className="text-base text-slate-500">
                                Review user roles, contact details, and manage their access.
                            </p>
                        </div>
                    </header>

                    {hasUsers ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {allUser.map((user) => (
                                <article
                                    key={user._id}
                                    className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.07)] transition hover:-translate-y-1"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-lg font-semibold text-slate-900">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {user.email}
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                user.isAdmin
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {user.isAdmin ? "Admin" : "User"}
                                        </span>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingUser(user)
                                                setFormData({
                                                    name: user.name,
                                                    email: user.email,
                                                })
                                            }}
                                            className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                                        >
                                            Update
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => deleteUser(user._id)}
                                            className="flex-1 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 px-6 py-12 text-center">
                            <p className="text-lg font-medium text-slate-700">
                                No users found
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* UPDATE MODAL */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
                        <h2 className="mb-4 text-xl font-semibold text-slate-900">
                            Update User
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                changeUser(editingUser._id, formData)
                                setEditingUser(null)
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
                                placeholder="Name"
                            />

                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
                                placeholder="Email"
                            />

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Users
