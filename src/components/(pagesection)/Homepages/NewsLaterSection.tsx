export default function Newsletter() {
    return (
        <section className="dark:bg-slate-800/75 bg-[#1B1A41] container mx-auto rounded-2xl p-8 my-8 text-white bg-gradient-to-tl from-pink-500/15 to-slate-800/75 shadow-md">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-300 mb-6">
                    Get the latest updates on new arrivals, special offers, and exclusive deals straight to your inbox.
                </p>
                <form className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full md:w-1/2 px-4 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-pink-500 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                    >
                        Subscribe
                    </button>
                </form>
                <p className="text-gray-400 text-sm mt-4">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    );
}
