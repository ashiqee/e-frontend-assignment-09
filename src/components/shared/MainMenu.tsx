import { siteConfig } from "@/config/site";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
  } from "@nextui-org/navbar";
import React from 'react';
import NextLink from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

const MainMenu = () => {
    return (
        <NextUINavbar className="mb-2 h-8" maxWidth="full" position="static">
              <NavbarContent>

<NavbarItem>

   <ul className="hidden lg:flex gap-4 justify-start ml-2">
  {siteConfig.navItems.map((item) => (
    <NavbarItem key={item.href}>
      <NextLink
        className={clsx(
          linkStyles({ color: "foreground" }),
          "data-[active=true]:text-primary data-[active=true]:font-medium",
        )}
        color="foreground"
        href={item.href}
      >
        {item.label}
      </NextLink>
    </NavbarItem>
  ))}
</ul>
</NavbarItem>
</NavbarContent>
</NextUINavbar>
    );
};

export default MainMenu;