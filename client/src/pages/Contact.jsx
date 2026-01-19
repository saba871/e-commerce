const studios = [
    {
        city: "Florence",
        address: "Via dei Fossi 14, 50123",
        hours: "Mon–Sat, 10a-7p",
    },
    {
        city: "Copenhagen",
        address: "Store Strandstræde 9, 1255",
        hours: "Tue–Sun, 11a-6p",
    },
    {
        city: "Mexico City",
        address: "Av. Álvaro Obregón 99, Roma Norte",
        hours: "Wed–Sun, 12p-8p",
    },
]

const Contact = () => {
    return (
        <main className="px-4 pb-24 pt-12 sm:px-8 lg:px-12">
            <section className="glass-panel space-y-6">
                <p className="tag-pill">Contact</p>
                <h1 className="text-4xl font-semibold tracking-tight">We design in dialogue with you.</h1>
                <p className="text-slate-500">
                    Whether you need bespoke wardrobe guidance, wholesale partnerships, or press inquiries—our studio concierge team is
                    available across time zones.
                </p>
                <div className="grid gap-6 lg:grid-cols-2">
                    <form className="space-y-4">
                        <input type="text" placeholder="Full name" className="input-field" />
                        <input type="email" placeholder="Email address" className="input-field" />
                        <textarea rows="5" placeholder="Tell us about your request" className="input-field resize-none" />
                        <button className="primary-btn w-full">Send Inquiry</button>
                    </form>
                    <div className="rounded-3xl bg-slate-900/5 p-6">
                        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Concierge</p>
                        <p className="mt-4 text-2xl font-semibold text-slate-900">studio@lumen.house</p>
                        <p className="mt-2 text-sm text-slate-500">Response within 24 hours</p>
                        <div className="mt-6 space-y-3 text-sm text-slate-500">
                            <p>Wholesale: partners@lumen.house</p>
                            <p>Press: editorial@lumen.house</p>
                            <p>Styling: atelier@lumen.house</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-16 glass-panel">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                        <p className="tag-pill">Studios</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Visit our ateliers</h2>
                        <p className="mt-2 max-w-2xl text-slate-500">
                            Private fittings and archive viewings are available by appointment. Our studio ambassadors curate looks in
                            conversation with your schedule.
                        </p>
                    </div>
                    <button className="secondary-btn">Book a fitting</button>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {studios.map((studio) => (
                        <div key={studio.city} className="rounded-2xl border border-slate-100 bg-white/70 p-5">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{studio.city}</p>
                            <p className="mt-3 text-lg font-semibold text-slate-900">{studio.address}</p>
                            <p className="mt-2 text-sm text-slate-500">{studio.hours}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Contact
