"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/icons";
import Link from "next/link";
import DebounceSearch from "../DebounceSearch";
import CartBar from "./CartBar";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import ProfileDropDown from "../ProfileDropDownMenu";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@/context/user.provider";
import { ThemeSwitch } from "@/components/theme-switch";
import MordernNavbar from "./MordernNavbar";

export default function NavBar() {
  const { user, isLoading } = useUser();
   const [showMenubar, setShowMenubar] = useState(false);
   const [lastScrollY, setLastScrollY] = useState(0);
 
   useEffect(() => {
     const handleScroll = () => {
       const currentScrollY = window.scrollY;
       if (currentScrollY > lastScrollY && currentScrollY > 20) {
         // Scrolling down
         setShowMenubar(true);
       } else {
         // Scrolling up
         setShowMenubar(false);
       }
       setLastScrollY(currentScrollY);
     };
 
     const debouncedHandleScroll = debounce(handleScroll, 150);
 
     window.addEventListener("scroll", debouncedHandleScroll);
     return () => {
       window.removeEventListener("scroll", debouncedHandleScroll);
     };
   }, [lastScrollY]);


   
  return (
    <>
    

      {/* Sticky Navbar */}
      {showMenubar && (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div
        className={`container mx-auto w-full  bg-gradient-to-tl from-pink-500/15 to-slate-800/75 
          dark:bg-slate-800/75 bg-[#1B1A41]/65 text-white rounded-b-2xl shadow-lg transition-transform duration-1000 ease-in transform 
          ${lastScrollY ? "translate-y-0" : "translate-y-[-100%]"}`}
      >
          <section className="flex justify-between items-center p-4">
            {/* Logo */}
            <div>
              <Link className="flex justify-start items-center gap-1" href="/">
                <Logo />
                <p className="font-bold text-3xl text-inherit">KidZ Bazar</p>
              </Link>
            </div>

            {/* Searchbar */}
            <div className="hidden md:block">
              <DebounceSearch />
            </div>

            {/* Cart Bar */}
            <ul className="hidden sm:flex items-center gap-2">
              {user && (
                <li className="hidden md:flex">
                  {user?.role === "CUSTOMER" && <CartBar />}
                </li>
              )}
              <li className="flex items-center gap-2">
                {user ? (
                  isLoading ? (
                    <ProfileSkeleton />
                  ) : (
                    <ProfileDropDown user={user} />
                  )
                ) : (
                  <div className="flex gap-2 items-center">
                    <Link
                      className="p-3 px-3 bg-slate-500/5 hover:bg-slate-500/25 rounded-full"
                      href={"/register"}
                    >
                      <ShoppingCart className="text-white" />
                    </Link>
                    <ProfileDropDown />
                  </div>
                )}
                <ThemeSwitch />
              </li>
            </ul>
          </section>
        </div>
        </div>
      )}
    </>
  );
}
// Utility: Debounce function
function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout | null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }