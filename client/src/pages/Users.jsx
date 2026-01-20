import { useEffect } from "react"
import { useAuth } from "../context/auth.context"

const Users = () => {
    const { allUser, getAllUser } = useAuth()

    useEffect(() => {
        getAllUser()
    }, [getAllUser])

    const hasUsers = Array.isArray(allUser) && allUser.length > 0

    return (
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
                            Review user roles, contact details, and manage their access in one clean view.
                        </p>
                    </div>
                </header>

                {hasUsers ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        {allUser.map((user) => (
                            <article
                                key={user._id}
                                className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_45px_120px_rgba(15,23,42,0.10)]"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-lg font-semibold text-slate-900">{user.name}</p>
                                        <p className="text-sm text-slate-500">{user.email}</p>
                                    </div>
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${user.isAdmin ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"}`}>
                                        {user.isAdmin ? "Admin" : "User"}
                                    </span>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 px-6 py-12 text-center">
                        <p className="text-lg font-medium text-slate-700">No users found</p>
                        <p className="mt-2 text-sm text-slate-500">
                            Once users start joining your platform, they will appear here for quick management.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Users
