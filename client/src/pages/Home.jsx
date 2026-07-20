import { motion } from 'framer-motion'

const collections = [
	{
		title: 'Sculpted Essentials',
		description: 'Architectural silhouettes and modern tailoring.',
		image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
		size: 'xl:col-span-2', // დიდ ეკრანზე 2 სვეტს დაიკავებს
	},
	{
		title: 'Luminous',
		description: 'Celestial geometry in gold.',
		image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=800&q=80',
		size: 'xl:col-span-1',
	},
	{
		title: 'Editorial',
		description: 'Parisian-made footwear.',
		image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
		size: 'xl:col-span-1',
	},
]

const fadeInUp = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}

const Home = () => {
	return (
		<motion.main
			initial="initial"
			animate="animate"
			// მაქსიმალური სიგანე გავზარდეთ 1600px-მდე და გვერდებზე დავამატეთ მეტი სივრცე
			className="mx-auto w-full max-w-[1600px] space-y-32 pb-24 pt-12 px-6 sm:px-10 lg:px-20"
		>
			{/* --- HERO SECTION --- */}
			<section className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
				<motion.div variants={fadeInUp} className="lg:col-span-7 xl:col-span-7">
					<span className="tag-pill mb-6">Collection 2026</span>
					<h1 className="text-6xl font-black leading-[1.05] tracking-tighter sm:text-8xl lg:text-8xl xl:text-9xl">
						Design <br />
						<span className="text-slate-400 italic font-light">meets</span> Atelier.
					</h1>
					<p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-500 lg:text-xl">Curated fashion essentials for the modern muse. Discover limited-run collections designed for elevated daily rituals.</p>
					<div className="mt-10 flex flex-wrap gap-5">
						<button className="primary-btn px-10 py-4">Shop The Edit</button>
						<button className="secondary-btn px-10 py-4">Our Story</button>
					</div>
				</motion.div>

				{/* სურათი ახლა უფრო გამოწეულია მარჯვნივ */}
				<motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative lg:col-span-5 xl:col-span-5">
					<div className="tilt-hover aspect-[4/5] w-full overflow-hidden rounded-[3rem] shadow-2xl">
						<img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1800&q=80" className="h-full w-full object-cover" alt="Main Fashion" />
					</div>
					{/* Floating Card - ახლა მარჯვენა კიდეზეა მიკრული */}
					<motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }} className="glass-panel absolute -bottom-8 -right-4 hidden max-w-[240px] p-6 lg:block border-slate-200/50">
						<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Next Drop</p>
						<p className="mt-1 text-lg font-semibold italic text-slate-900">Milan Fashion Week 26'</p>
					</motion.div>
				</motion.div>
			</section>

			{/* --- BENTO GRID SECTION --- */}
			<section className="w-full">
				<div className="mb-12 flex items-end justify-between border-b border-slate-100 pb-8">
					<div>
						<h2 className="text-5xl font-bold tracking-tight">The Gallery</h2>
						<p className="mt-2 text-slate-500 font-medium text-lg">Selected editorial drops.</p>
					</div>
					<button className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors pb-1">View All Stories</button>
				</div>

				<div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
					{collections.map((col, i) => (
						<motion.div key={i} variants={fadeInUp} whileInView="animate" viewport={{ once: true }} className={`tilt-hover group relative overflow-hidden rounded-[2.5rem] bg-slate-100 ${col.size}`}>
							<img src={col.image} alt={col.title} className="h-[550px] w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
							<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent p-12 flex flex-col justify-end text-white">
								<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-3">Autumn / Winter 26</span>
								<h3 className="text-4xl font-bold tracking-tight">{col.title}</h3>
								<p className="mt-3 max-w-sm text-base text-white/70 leading-relaxed">{col.description}</p>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* --- STATS SECTION --- */}
			<section className="glass-panel grid grid-cols-2 gap-12 py-24 text-center md:grid-cols-4 border-none shadow-sm">
				{[
					{ val: '72h', label: 'Prototyping' },
					{ val: '18', label: 'Ateliers' },
					{ val: '96%', label: 'Natural' },
					{ val: '12', label: 'Yearly Drops' },
				].map((stat, i) => (
					<div key={i} className="group cursor-default">
						<p className="text-6xl font-black tracking-tighter text-slate-900 transition-transform group-hover:scale-110">{stat.val}</p>
						<p className="mt-3 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
					</div>
				))}
			</section>

			{/* --- NEWSLETTER --- */}
			<section className="w-full">
				<motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 40, opacity: 0 }} className="glass-panel relative overflow-hidden bg-slate-900 py-28 text-center text-white rounded-[4rem]">
					<div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-white/5 blur-[100px]" />
					<div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

					<div className="relative z-10 space-y-10">
						<h2 className="text-5xl font-bold tracking-tight sm:text-6xl italic font-serif">Studio Briefings</h2>
						<p className="mx-auto max-w-lg text-lg text-slate-400">Bespoke previews, styling guidance, and private sale invitations—delivered monthly to your inbox.</p>
						<form className="mx-auto flex max-w-lg flex-col gap-4 px-6 sm:flex-row">
							<input type="email" placeholder="Email address" className="input-field !bg-white/5 !text-white !ring-white/10 focus:!ring-white/30 h-14" />
							<button className="primary-btn !bg-white !text-slate-900 hover:!bg-slate-100 px-10 h-14">Join</button>
						</form>
					</div>
				</motion.div>
			</section>
		</motion.main>
	)
}

export default Home
