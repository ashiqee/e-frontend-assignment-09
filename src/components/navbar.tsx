"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { User } from 'lucide-react';
import NextLink from "next/link";

import ProfileDropDown from "./shared/ProfileDropDownMenu";
import CartBar from "./shared/bar/CartBar";
import MainMenu from "./shared/MainMenu";
import DebounceSearch from "./shared/DebounceSearch";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
    
 
  SearchIcon,
  Logo,
} from "@/components/icons";
import { useGetCurrentUser } from "@/hooks/users.hook";
import { Suspense } from "react";
import ProfileSkeleton from "./skeletons/ProfileSkeleton";



export const Navbar =  () => {
 const {data:user,isLoading}= useGetCurrentUser()

    
    

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="full" className="md:hidden block"  position="sticky">
     <div className="flex  items-center md:container mx-auto justify-between w-full">
     <NavbarContent className="md:hidden block" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-3xl  text-inherit">KidZ Bazar</p>
          </NextLink>
        </NavbarBrand>

 
       
      </NavbarContent>

   

      <NavbarContent className="z-50" justify="end">
        
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
      <DebounceSearch/>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={
                  index === 2
                  ?  `${item.href}`
                  :  `/${(user?.role)?.toLowerCase()}${item.href}
                 `}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
   
     </div>

    </NextUINavbar>
  );
};
