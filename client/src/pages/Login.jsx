import { useAuth } from "../context/auth.context";
import { useForm } from "../hooks/useForm";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // რეგისტრაციაზე გადასასვლელად

const LogIn = () => {
    const { logIn } = useAuth();

    const [formData, handleChange] = useForm({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        logIn(formData);
    };

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto flex min-h-[90vh] max-w-[1400px] flex-col items-center justify-center gap-0 px-6 py-12 md:flex-row md:px-12"
        >
            {/* --- LEFT SECTION: BRAND EXPERIENCE --- */}
            <section className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-t-[2.5rem] bg-slate-900 p-12 text-white md:h-[700px] md:rounded-l-[3rem] md:rounded-tr-none shadow-2xl">
                <div className="relative z-10">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40"
                    >
                        Members Only
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-8 text-5xl font-black tracking-tighter leading-none sm:text-6xl"
                    >
                        Lumen <br />
                        <span className="text-slate-500 italic font-light">Studio Access.</span>
                    </motion.h1>
                    <p className="mt-8 max-w-sm text-lg leading-relaxed text-white/60 font-medium">
                        Unlock editorial styling tools, private previews, and atelier appointments tailored to your aesthetic.
                    </p>
                </div>

                <div className="relative z-10 mt-20 space-y-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/30">Privileges</p>
                    <ul className="space-y-4">
                        {['Curated recommendations', 'Priority drop access', 'Atelier appointments'].map((item, i) => (
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                key={i}
                                className="flex items-center gap-3 text-sm font-semibold tracking-tight text-white/80"
                            >
                                <span className="h-1 w-1 rounded-full bg-slate-500" />
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Decorative Blur */}
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-slate-800/50 blur-[100px]" />
            </section>

            {/* --- RIGHT SECTION: LOGIN FORM --- */}
            <section className="flex flex-1 flex-col justify-center rounded-b-[2.5rem] bg-white p-12 md:h-[700px] md:rounded-r-[3rem] md:rounded-bl-none shadow-2xl border-y border-r border-slate-50">
                <div className="mx-auto w-full max-w-md">
                    <header className="mb-12">
                        <span className="tag-pill text-[10px]">Authentication</span>
                        <h2 className="mt-6 text-4xl font-black tracking-tighter text-slate-900">Welcome Back.</h2>
                        <p className="mt-2 text-slate-500 font-medium text-sm">Please enter your studio credentials.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="group space-y-2">
                                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="studio@lumen.com"
                                    className="input-field h-14 border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                                    required
                                />
                            </div>

                            <div className="group space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-slate-900 transition-colors">
                                        Password
                                    </label>
                                    <button type="button" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">
                                        Forgot?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="input-field h-14 border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="primary-btn h-16 w-full text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-slate-200 hover:shadow-2xl active:scale-[0.98] transition-all"
                        >
                            Access Studio
                        </button>
                    </form>

                    <footer className="mt-12 border-t border-slate-100 pt-8 text-center">
                        <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                            By accessing the studio, you agree to the <br />
                            <span className="text-slate-900 cursor-pointer hover:underline">Atelier Terms</span> and <span className="text-slate-900 cursor-pointer hover:underline">Privacy Policy</span>.
                        </p>

                        {/* --- რეგისტრაციის ლინკი --- */}
                        <p className="mt-6 text-xs text-slate-500 font-medium">
                            New to Lumen?{" "}
                            <Link
                                to="/register"
                                className="font-black text-slate-900 underline underline-offset-4 hover:text-slate-600 transition-colors"
                            >
                                Create an Account
                            </Link>
                        </p>
                    </footer>
                </div>
            </section>
        </motion.main>
    );
};

export default LogIn;
