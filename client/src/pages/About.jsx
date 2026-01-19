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
]

const About = () => {
    return (
        <main className="px-4 pb-24 pt-12 sm:px-8 lg:px-12">
            <section className="glass-panel relative overflow-hidden px-6 py-16 sm:px-12">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/30 to-transparent" />
                <img
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1800&q=80"
                    alt="Studio"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 max-w-3xl text-white">
                    <p className="tag-pill border-white/40 text-white/80">Our Maison</p>
                    <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">A study in sculpted essentials.</h1>
                    <p className="mt-6 text-lg text-white/75">
                        Lumen is a house devoted to curated wardrobes—pieces that feel bespoke yet effortless, crafted in conversation with
                        modern life.
                    </p>
                </div>
            </section>

            <section className="mt-16 grid gap-10 lg:grid-cols-2">
                <div className="glass-panel space-y-5">
                    <p className="tag-pill">Philosophy</p>
                    <h2 className="text-3xl font-semibold tracking-tight">Designed for longevity</h2>
                    <p className="text-slate-500">
                        We release limited capsules instead of trends. Each drop is developed with circularity in mind—from recyclable
                        trims to modular construction that encourages tailoring rather than replacement.
                    </p>
                    <div className="rounded-2xl bg-slate-900/5 p-6">
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Studios</p>
                        <p className="mt-3 text-2xl font-semibold text-slate-900">Florence · Copenhagen · Mexico City</p>
                        <p className="mt-3 text-sm text-slate-500">
                            Our teams collaborate digitally to keep iteration fast while production remains intentionally slow.
                        </p>
                    </div>
                </div>

                <div className="glass-panel space-y-8">
                    <p className="tag-pill">Manifesto</p>
                    <ul className="space-y-5">
                        {atelierHighlights.map((item) => (
                            <li key={item.title} className="rounded-2xl border border-slate-100/80 bg-white/70 p-5">
                                <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{item.title}</p>
                                <p className="mt-3 text-lg font-semibold text-slate-900">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="mt-20 glass-panel">
                <p className="tag-pill">Responsibility</p>
                <div className="mt-6 grid gap-8 sm:grid-cols-3">
                    <div>
                        <p className="text-4xl font-semibold text-slate-900">92%</p>
                        <p className="text-sm text-slate-500">Natural or recycled fibers per collection</p>
                    </div>
                    <div>
                        <p className="text-4xl font-semibold text-slate-900">48 hrs</p>
                        <p className="text-sm text-slate-500">Lead time from sketch to prototype</p>
                    </div>
                    <div>
                        <p className="text-4xl font-semibold text-slate-900">100%</p>
                        <p className="text-sm text-slate-500">Carbon-neutral shipping & packaging</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default About
