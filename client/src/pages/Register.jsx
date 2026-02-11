import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // თუ იყენებ როუტინგს

const Register = () => {
    const { signup } = useAuth();

    const [formData, handleChange] = useForm({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto flex min-h-[90vh] max-w-[1400px] flex-col items-center justify-center gap-0 px-6 py-12 md:flex-row md:px-12"
        >
            {/* --- LEFT SECTION: CONCEPT & LIFESTYLE --- */}
            <section className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-t-[2.5rem] bg-slate-50 p-12 text-slate-900 md:h-[750px] md:rounded-l-[3rem] md:rounded-tr-none border border-slate-100 shadow-2xl">
                <div className="relative z-10">
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400"
                    >
                        Join the Atelier
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-8 text-5xl font-black tracking-tighter leading-[0.9] sm:text-6xl"
                    >
                        Elevated <br />
                        <span className="text-slate-300 italic font-light">Concierge.</span>
                    </motion.h1>
                    <p className="mt-8 max-w-sm text-lg leading-relaxed text-slate-500 font-medium">
                        Tailored lookbooks, atelier previews, and dedicated styling assistance designed for modern collectors.
                    </p>
                </div>

                <div className="relative z-10 mt-16 space-y-8">
                    <div className="space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Membership Benefits</p>
                        <div className="grid gap-4">
                            {[
                                { title: "Personalized Curation", desc: "Capsules tailored to your lifestyle." },
                                { title: "Direct Atelier Access", desc: "Consult with our master tailors." },
                                { title: "Private Trunk Shows", desc: "Priority invites to exclusive drops." }
                            ].map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex flex-col"
                                >
                                    <span className="text-sm font-bold text-slate-900">{benefit.title}</span>
                                    <span className="text-xs text-slate-500">{benefit.desc}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-white blur-[120px]" />
            </section>

            {/* --- RIGHT SECTION: REGISTRATION FORM --- */}
            <section className="flex flex-1 flex-col justify-center rounded-b-[2.5rem] bg-white p-12 md:h-[750px] md:rounded-r-[3rem] md:rounded-bl-none shadow-2xl border-y border-r border-slate-50">
                <div className="mx-auto w-full max-w-md">
                    <header className="mb-10">
                        <span className="tag-pill text-[10px]">New Profile</span>
                        <h2 className="mt-6 text-4xl font-black tracking-tighter text-slate-900">Begin Journey.</h2>
                        <p className="mt-2 text-slate-500 font-medium text-sm">Create your private collector profile.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group space-y-1">
                            <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Avery Laurent"
                                className="input-field h-14 bg-slate-50/50 focus:bg-white transition-all"
                                required
                            />
                        </div>

                        <div className="group space-y-1">
                            <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="atelier@lumen.com"
                                className="input-field h-14 bg-slate-50/50 focus:bg-white transition-all"
                                required
                            />
                        </div>

                        <div className="group space-y-1">
                            <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="input-field h-14 bg-slate-50/50 focus:bg-white transition-all"
                                required
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="primary-btn h-16 w-full text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-slate-200 hover:shadow-2xl active:scale-[0.98] transition-all"
                            >
                                Request Access
                            </button>
                        </div>
                    </form>

                    <footer className="mt-10 border-t border-slate-50 pt-8">
                        <p className="text-center text-[11px] leading-relaxed text-slate-400 font-medium italic">
                            Submissions are reviewed within 48 hours. You will receive a bespoke onboarding brief upon approval.
                        </p>
                        <p className="mt-6 text-center text-xs text-slate-900">
                            Already a member? <Link to="/login" className="font-bold underline underline-offset-4">Sign In</Link>
                        </p>
                    </footer>
                </div>
            </section>
        </motion.main>
    );
};

export default Register;
