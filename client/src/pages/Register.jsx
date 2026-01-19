import { useAuth } from "../context/auth.context"
import { useForm } from "../hooks/useForm"

const Register = () => {
    const { signup } = useAuth()

    const [formData, handleChange] = useForm({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(formData)
    }

    return (
        <main className="mx-auto flex min-h-[80vh] max-w-5xl flex-col gap-12 px-4 py-16 sm:px-8 md:flex-row">
            <section className="glass-panel flex flex-1 flex-col gap-6 bg-white">
                <div>
                    <p className="tag-pill">Private Client</p>
                    <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">Elevated wardrobe concierge</h1>
                    <p className="mt-4 text-slate-500">
                        Tailored lookbooks, atelier previews, and dedicated styling assistance designed for modern collectors.
                    </p>
                </div>
                <div className="space-y-3 text-sm text-slate-500">
                    <p className="font-semibold uppercase tracking-[0.4em] text-slate-400">Includes</p>
                    <ul className="space-y-2">
                        <li>• Personalized capsule curation</li>
                        <li>• Direct line to atelier specialists</li>
                        <li>• Invitations to trunk shows & fittings</li>
                    </ul>
                </div>
            </section>

            <section className="glass-panel flex flex-1 flex-col gap-6">
                <div>
                    <p className="tag-pill">Create profile</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Enter your details</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Avery Laurent" className="input-field" />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="atelier@lumen.com" className="input-field" />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" className="input-field" />
                    </div>

                    <button type="submit" className="primary-btn w-full">Request Access</button>
                </form>

                <p className="text-sm text-slate-500">
                    Submissions are reviewed within 48 hours. You will receive a bespoke onboarding brief upon approval.
                </p>
            </section>
        </main>
    )
}

export default Register
