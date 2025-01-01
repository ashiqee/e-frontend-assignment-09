import Link from "next/link";
import { Logo } from "../icons";

export default function Footer() {
    return (
        <footer className="dark:bg-slate-800/75 bg-[#1B1A41] container mx-auto sticky top-8 z-50
         text-white rounded-t-2xl bg-gradient-to-tl from-pink-500/15 to-slate-800/75 transition-transform duration-1000 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Logo and Tagline */}
                <div className="mb-4 md:mb-0">
                <div>
            <Link className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-3xl text-inherit">KidZ Bazar</p>
            </Link>
          </div>
                    <p className="text-sm text-gray-400">Your one-stop shop for everything!</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row gap-6 text-sm">
                    <Link href="/" className="hover:text-pink-500">Home</Link>
                    <Link href="/shop" className="hover:text-pink-500">Shop</Link>
                    <Link href="/products" className="hover:text-pink-500">Products</Link>
                    <Link href="/about" className="hover:text-pink-500">About Us</Link>
                    <Link href="/contact" className="hover:text-pink-500">Contact</Link>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-pink-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.989 3.657 9.124 8.438 9.876v-6.987H8.9v-2.889h1.538V9.81c0-1.522.912-2.365 2.292-2.365.667 0 1.364.12 1.364.12v1.5h-.768c-.759 0-1.004.47-1.004.952v1.141h1.791l-.286 2.888h-1.505v6.987C18.343 21.124 22 16.989 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                    </Link>
                    <Link href="#" className="hover:text-pink-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557a9.832 9.832 0 0 1-2.827.775 4.937 4.937 0 0 0 2.165-2.723 9.835 9.835 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482A13.978 13.978 0 0 1 1.671 3.149a4.92 4.92 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.924 4.924 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 19.539a13.9 13.9 0 0 0 7.548 2.211c9.058 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
                        </svg>
                    </Link>
                    <Link href="#" className="hover:text-pink-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.989 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V8.69c0-3.019 1.795-4.687 4.533-4.687 1.312 0 2.684.235 2.684.235v2.953h-1.51c-1.492 0-1.953.927-1.953 1.878v2.233h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 18.989 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
