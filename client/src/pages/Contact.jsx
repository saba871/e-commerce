import { motion } from "framer-motion";

const studios = [
    {
        city: "Florence",
        address: "Via dei Fossi 14, 50123",
        hours: "Mon-Sat, 10a-7p",
    },
    {
        city: "Copenhagen",
        address: "Store Strandstræde 9, 1255",
        hours: "Tue-Sun, 11a-6p",
    },
    {
        city: "Mexico City",
        address: "Av. Álvaro Obregón 99, Roma Norte",
        hours: "Wed-Sun, 12p-8p",
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const Contact = () => {
    return (
        <motion.main
            initial="initial"
            animate="animate"
            className="mx-auto w-full max-w-[1600px] space-y-24 pb-24 pt-12 px-6 sm:px-10 lg:px-20"
        >
            {/* --- HEADER SECTION --- */}
            <section className="max-w-4xl">
                <motion.p variants={fadeInUp} className="tag-pill w-fit">Contact</motion.p>
                <motion.h1 variants={fadeInUp} className="mt-8 text-6xl font-black tracking-tighter sm:text-7xl lg:text-8xl text-slate-900 leading-[1.1]">
                    We design in <br />
                    <span className="text-slate-400 italic font-light">dialogue</span> with you.
                </motion.h1>
                <motion.p variants={fadeInUp} className="mt-8 text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
                    Whether you need bespoke wardrobe guidance, wholesale partnerships, or press inquiries—our studio concierge team is available across time zones.
                </motion.p>
            </section>

            {/* --- FORM & CONCIERGE GRID --- */}
            <section className="grid gap-12 lg:grid-cols-12 lg:items-start">
                <motion.div variants={fadeInUp} className="lg:col-span-7">
                    <form className="glass-panel space-y-6 p-10 border-none bg-slate-50/50 shadow-sm">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                <input type="text" placeholder="e.g. Elena Vance" className="input-field h-14" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                <input type="email" placeholder="elena@lumen.house" className="input-field h-14" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Message</label>
                            <textarea rows="6" placeholder="Tell us about your request..." className="input-field resize-none p-5" />
                        </div>
                        <button className="primary-btn w-full h-16 text-lg tracking-widest uppercase">Send Inquiry</button>
                    </form>
                </motion.div>

                <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-8">
                    <div className="glass-panel p-10 bg-slate-900 text-white border-none shadow-2xl rounded-[3rem]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Main Concierge</p>
                        <p className="mt-6 text-3xl font-light tracking-tight hover:text-slate-300 transition-colors cursor-pointer">
                            studio@lumen.house
                        </p>
                        <p className="mt-4 text-sm text-slate-400 italic">Response within 24 hours</p>

                        <div className="mt-12 space-y-6 pt-12 border-t border-white/10">
                            {[
                                { label: "Wholesale", email: "partners@lumen.house" },
                                { label: "Press", email: "editorial@lumen.house" },
                                { label: "Styling", email: "atelier@lumen.house" }
                            ].map((dept) => (
                                <div key={dept.label} className="flex justify-between items-center group cursor-pointer">
                                    <p className="text-xs uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{dept.label}</p>
                                    <p className="text-sm font-medium group-hover:underline">{dept.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- STUDIOS SECTION --- */}
            <section className="pt-24 border-t border-slate-100">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div className="max-w-2xl">
                        <p className="tag-pill">Studios</p>
                        <h2 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">Visit our ateliers</h2>
                        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                            Private fittings and archive viewings are available by appointment. Our studio ambassadors curate looks in conversation with your schedule.
                        </p>
                    </div>
                    <button className="secondary-btn h-14 px-10 border-2">Book a private fitting</button>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {studios.map((studio, i) => (
                        <motion.div
                            key={studio.city}
                            whileHover={{ y: -10 }}
                            className="group rounded-[2.5rem] border border-slate-100 bg-white p-10 transition-all hover:shadow-xl hover:border-slate-200"
                        >
                            <div className="h-1 w-8 bg-slate-900 mb-8 transition-all group-hover:w-16" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{studio.city}</p>
                            <p className="mt-6 text-xl font-bold text-slate-900 leading-snug">{studio.address}</p>
                            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {studio.hours}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </motion.main>
    );
};

export default Contact;
