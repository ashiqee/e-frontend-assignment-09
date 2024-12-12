import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { ShoppingCart, User } from 'lucide-react';
import NextLink from "next/link";

import ProfileDropDown from "./shared/ProfileDropDownMenu";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
    GithubIcon,
 
  SearchIcon,
  Logo,
} from "@/components/icons";
import { getCurrentUser } from "@/services/AuthService";


export const Navbar = async () => {
    const user = await getCurrentUser();

    
    

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

        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
       
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
       
      
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={"/carts"}
            variant="flat"
          >
           <ShoppingCart/>
          </Button>
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
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
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
