"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/icons";
import Link from "next/link";
import DebounceSearch from "../DebounceSearch";
import CartBar from "./CartBar";
import { useUser } from "@/context/user.provider";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import ProfileDropDown from "../ProfileDropDownMenu";
import { List, ShoppingCart } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@headlessui/react";
import { FaDiscourse } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import MegaMenuDropDown from "../DropdownMenu/MegaMenuDropDown";

export default function MordernNavbar() {
  const { user, isLoading } = useUser();
  const [showMenubar, setShowMenubar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        // Scrolling down
        setShowMenubar(false);
      } else {
        // Scrolling up
        setShowMenubar(true);
      }
      setLastScrollY(currentScrollY);
    };

    const debouncedHandleScroll = debounce(handleScroll, 50);

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`dark:bg-slate-800/75 bg-[#1B1A41] container mx-auto  sticky top-8 z-50 text-white rounded-b-2xl
      bg-gradient-to-tl from-pink-500/15 to-slate-800/75 transition-transform duration-1000 ${
        showMenubar ? "translate-y-0" : "-translate-y-60"
      }`}
    >
      <div className="">
        {/* search bar with logo */}
        <section className="justify-between flex items-center py-4 px-6">
          {/* logo */}
          <div>
            <Link className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-3xl text-inherit">KidZ Bazar</p>
            </Link>
          </div>

          {/* search bar */}
          <div className="hidden md:block">
            <DebounceSearch />
          </div>

          {/* cart Bar */}
          <ul className="hidden sm:flex">
            {user && (
              <li className="hidden md:flex">
                {user?.role === "CUSTOMER" && <CartBar />}
              </li>
            )}
            <li className="hidden sm:flex gap-2">
              {user ? (
                <>
                  {isLoading ? (
                    <ProfileSkeleton />
                  ) : (
                    <ProfileDropDown user={user} />
                  )}
                </>
              ) : (
                <div className="flex gap-2 items-center">
                  <Link
                    className="p-3 px-3 bg-slate-500/5 hover:bg-slate-500/25 rounded-full"
                    href="/register"
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

        {/* menubar */}
        <section
          className={`flex justify-between items-center pb-4 px-6 transition-transform duration-300 ${
            showMenubar ? "translate-y-0" : "-translate-y-24"
          }`}
        >
          <div className="flex gap-6 items-center">
            
            <MegaMenuDropDown/>
            <div className="flex gap-6 items-center">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-pink-500/75"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/products/flash-sale" className="flex gap-2 items-center">
            <FaDiscourse />
            Flash Sale
          </Link>
        </section>
      </div>
    </div>
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
