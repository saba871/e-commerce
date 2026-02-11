import { motion } from "framer-motion";

const atelierHighlights = [
    {
        title: "Heritage Craft",
        description: "Every garment is cut and finished within our Florence atelier, in collaboration with artisans who have honed their craft for generations.",
    },
    {
        title: "Considered Materials",
        description: "We source small-batch textiles from regenerative mills across Kyoto, Como, and Porto to ensure traceable luxury.",
    },
    {
        title: "Quiet Innovation",
        description: "Architectural silhouettes meet wearable function through modular pattern work and zero-waste cutting techniques.",
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.15 } }
};

const About = () => {
    return (
        <motion.main
            initial="initial"
            animate="animate"
            className="mx-auto w-full max-w-[1600px] space-y-32 pb-24 pt-12 px-6 sm:px-10 lg:px-20"
        >
            {/* --- HERO SECTION: FULL WIDTH --- */}
            <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-[3rem] shadow-2xl">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1800&q=80"
                        alt="Studio"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent" />
                </motion.div>

                <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-16 lg:max-w-4xl">
                    <motion.p variants={fadeInUp} className="tag-pill w-fit border-white/40 text-white/90 bg-white/10 backdrop-blur-md">
                        Our Maison
                    </motion.p>
                    <motion.h1 variants={fadeInUp} className="mt-8 text-5xl font-black leading-[1.1] tracking-tighter text-white sm:text-7xl">
                        A study in <br />
                        <span className="italic font-light text-slate-300">sculpted</span> essentials.
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="mt-8 max-w-xl text-lg text-white/80 leading-relaxed lg:text-xl">
                        Lumen is a house devoted to curated wardrobes—pieces that feel bespoke yet effortless, crafted in conversation with modern life.
                    </motion.p>
                </div>
            </section>

            {/* --- CONTENT GRID --- */}
            <section className="grid gap-12 lg:grid-cols-12">
                {/* Left Column: Philosophy */}
                <motion.div
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="glass-panel space-y-8 lg:col-span-5 p-10 border-none bg-white/50 shadow-sm"
                >
                    <p className="tag-pill">Philosophy</p>
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 leading-[1.2]">Designed for <br/> longevity</h2>
                    <p className="text-lg text-slate-500 leading-relaxed italic">
                        "We release limited capsules instead of trends. Each drop is developed with circularity in mind."
                    </p>

                    <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Main Studios</p>
                        <p className="mt-4 text-2xl font-semibold">Florence · Copenhagen · Mexico City</p>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">
                            Our teams collaborate digitally to keep iteration fast while production remains intentionally slow.
                        </p>
                    </div>
                </motion.div>

                {/* Right Column: Manifesto Staggered List */}
                <motion.div
                    variants={staggerContainer}
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="lg:col-span-7 space-y-6"
                >
                    <p className="tag-pill mb-8">Manifesto</p>
                    {atelierHighlights.map((item, index) => (
                        <motion.div
                            key={item.title}
                            variants={fadeInUp}
                            className="group rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-6">
                                <span className="text-sm font-black text-slate-200">0{index + 1}</span>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">{item.title}</p>
                                    <p className="mt-4 text-xl font-medium text-slate-800 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* --- RESPONSIBILITY: BOLD METRICS --- */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel relative overflow-hidden bg-slate-50 py-20 px-12 border-none"
            >
                <div className="relative z-10 grid gap-12 sm:grid-cols-3">
                    {[
                        { val: "92%", label: "Natural or recycled fibers per collection" },
                        { val: "48 hrs", label: "Lead time from sketch to prototype" },
                        { val: "100%", label: "Carbon-neutral shipping & packaging" }
                    ].map((metric, i) => (
                        <div key={i} className="space-y-4">
                            <p className="text-6xl font-black tracking-tighter text-slate-900">{metric.val}</p>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 max-w-[200px]">
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.section>
        </motion.main>
    );
};

export default About;
