const collections = [
    {
        title: "Sculpted Essentials",
        description: "Architectural silhouettes, Italian textiles, and modern tailoring for the everyday muse.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Luminous Jewelry",
        description: "Handcrafted 18k gold chains and statement earrings inspired by celestial geometry.",
        image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "Editorial Footwear",
        description: "Parisian-made boots with sculptural heels and buttery-soft pebble leather.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    },
]

const Home = () => {
    return (
        <main className="px-4 pb-24 pt-12 sm:px-8 lg:px-12">
            <section className="glass-panel relative overflow-hidden px-6 py-12 sm:px-12">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/30 to-transparent" />
                <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1800&q=80"
                    alt="Runway"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 max-w-3xl text-white">
                    <p className="tag-pill border-white/40 text-white/80">New Season</p>
                    <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        Curated fashion essentials for the modern atelier.
                    </h1>
                    <p className="mt-6 text-lg text-white/75">
                        Luxe fabrics, sculptural lines, and considered details. Discover limited-run collections designed for elevated daily rituals.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <button className="primary-btn">Shop New Arrivals</button>
                        <button className="secondary-btn text-white">Explore Collections</button>
                    </div>
                </div>
            </section>

            <section className="mt-16 space-y-14">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <p className="tag-pill">Collections</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Editorial drops</h2>
                        <p className="mt-2 max-w-2xl text-slate-500">
                            Meticulously sourced materials, developed in micro batches with ateliers across Milan, Copenhagen, and Tokyo.
                        </p>
                    </div>
                    <button className="secondary-btn">See all stories</button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {collections.map((collection) => (
                        <article key={collection.title} className="group glass-panel overflow-hidden border-none p-0">
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={collection.image}
                                    alt={collection.title}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />
                            </div>
                            <div className="space-y-3 px-6 py-6">
                                <h3 className="text-2xl font-semibold text-slate-900">{collection.title}</h3>
                                <p className="text-slate-500">{collection.description}</p>
                                <button className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                                    Discover the edit →
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mt-20 grid gap-10 lg:grid-cols-2">
                <div className="glass-panel space-y-5">
                    <p className="tag-pill">Journal</p>
                    <h2 className="text-3xl font-semibold tracking-tight">Crafted in detail</h2>
                    <p className="text-slate-500">
                        From atelier visits in Florence to textiles sourced in Kyoto—our makers obsess over every panel, stitch, and finish. Each silhouette is cut to flatter and meant to last beyond seasons.
                    </p>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <p className="text-4xl font-semibold">72</p>
                            <p className="text-sm text-slate-500">Hours spent on each prototype</p>
                        </div>
                        <div>
                            <p className="text-4xl font-semibold">18</p>
                            <p className="text-sm text-slate-500">Boutique ateliers in collaboration</p>
                        </div>
                        <div>
                            <p className="text-4xl font-semibold">96%</p>
                            <p className="text-sm text-slate-500">Natural fabric compositions</p>
                        </div>
                        <div>
                            <p className="text-4xl font-semibold">12</p>
                            <p className="text-sm text-slate-500">Limited drops per year</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel space-y-6">
                    <p className="tag-pill">Newsletter</p>
                    <h2 className="text-3xl font-semibold tracking-tight">Studio briefings</h2>
                    <p className="text-slate-500">
                        Elevated styling guidance, atelier visits, bespoke previews, and private sale invitations—delivered monthly.
                    </p>
                    <form className="flex flex-col gap-4 sm:flex-row">
                        <input type="email" placeholder="Email address" className="input-field" />
                        <button className="primary-btn whitespace-nowrap">Join list</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Home
