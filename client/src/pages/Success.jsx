import { Link } from "react-router-dom"

const Success = () => (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16">
        <div className="glass-panel max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Order confirmed</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">Thank you for your purchase</h1>
            <p className="mt-3 text-base text-slate-500">
                Your curated pieces are being prepared. You will receive a confirmation email with the details in a few
                moments.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link to="/items" className="primary-btn">
                    Continue shopping
                </Link>
                <Link to="/" className="secondary-btn">
                    Back to home
                </Link>
            </div>
        </div>
    </main>
)

export default Success
