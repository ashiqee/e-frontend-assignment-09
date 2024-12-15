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



export const Navbar =  () => {
 const {data:user}= useGetCurrentUser()

    
    

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
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-3xl  text-inherit">KidZ Bazar</p>
          </NextLink>
        </NavbarBrand>

        <NavbarItem className="hidden lg:flex">
          {/* {searchInput} */}

          <DebounceSearch/>


        </NavbarItem>
       
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
       <MainMenu/>
      
        <NavbarItem className="hidden md:flex">
        {user?.role === "CUSTOMER" &&  <CartBar/> }
         
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
      {
        user ? <ProfileDropDown user={user}/> :<>
            <Link  className="flex gap-2 items-center p-2 px-4 bg-slate-500/5
             hover:bg-slate-500/25 rounded-xl" 
              href={'/login'}>
          <User  className="text-default-500" />
           <span>Sing In</span> 
          </Link>
        </>
      }
       
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
   

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
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
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
   

    </NextUINavbar>
  );
};
