import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Success = () => {
    return (
        <main className="flex min-h-[85vh] items-center justify-center px-6 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-panel w-full max-w-2xl overflow-hidden p-12 text-center shadow-2xl"
            >
                {/* --- SUCCESS ICON --- */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                    }}
                    className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="h-10 w-10"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </motion.div>

                {/* --- CONTENT --- */}
                <header className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">
                        Order Confirmed
                    </p>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl">
                        Thank you for <br />
                        <span className="text-slate-400 italic font-light text-3xl sm:text-4xl">choosing Lumen.</span>
                    </h1>
                    <div className="mx-auto h-px w-12 bg-slate-200 my-6" />
                    <p className="mx-auto max-w-md text-base leading-relaxed text-slate-500 font-medium">
                        Your curated pieces are being prepared by our atelier. You will receive a bespoke confirmation email with details in a few moments.
                    </p>
                </header>

                {/* --- ACTIONS --- */}
                <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Link
                        to="/items"
                        className="primary-btn h-14 min-w-[200px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-105 transition-all"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        to="/"
                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all border-b border-transparent hover:border-slate-900 pb-1"
                    >
                        Return Home
                    </Link>
                </div>

                {/* --- FOOTER NOTE --- */}
                <p className="mt-16 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
                    Private Client Concierge: studio@lumen.com
                </p>
            </motion.div>
        </main>
    );
};

export default Success;
