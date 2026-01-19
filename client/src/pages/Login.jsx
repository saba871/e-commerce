import { useAuth } from "../context/auth.context"
import { useForm } from "../hooks/useForm"

const LogIn = () => {
    const { logIn } = useAuth()

    const [formData, handleChange] = useForm({
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        logIn(formData)
    }

    return (
        <main className="mx-auto flex min-h-[80vh] max-w-5xl flex-col gap-12 px-4 py-16 sm:px-8 md:flex-row">
            <section className="glass-panel flex flex-1 flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 text-white">
                <div>
                    <p className="text-sm uppercase tracking-[0.5em] text-white/60">Members</p>
                    <h1 className="mt-6 text-4xl font-semibold tracking-tight">Lumen Studio Access</h1>
                    <p className="mt-4 text-white/80">
                        Unlock editorial styling tools, private previews, and atelier appointments tailored to your preferences.
                    </p>
                </div>
                <div className="mt-10 space-y-3">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/60">Benefits</p>
                    <ul className="space-y-2 text-sm text-white/80">
                        <li>• Curated wardrobe recommendations</li>
                        <li>• Priority access to custom drops</li>
                        <li>• Complimentary tailoring appointments</li>
                    </ul>
                </div>
            </section>

            <section className="glass-panel flex flex-1 flex-col gap-6">
                <div>
                    <p className="tag-pill">Welcome back</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Enter your credentials</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="studio@lumen.com" className="input-field" />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="input-field" />
                    </div>

                    <button type="submit" className="primary-btn w-full">Access Studio</button>
                </form>

                <p className="text-sm text-slate-500">
                    By signing in you agree to our Atelier Terms and Private Client Privacy Policy.
                </p>
            </section>
        </main>
    )
}

export default LogIn
