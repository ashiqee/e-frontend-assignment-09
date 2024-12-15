import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarItem,
  } from "@nextui-org/navbar";
import React from 'react';
import NextLink from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";

const MainMenu = () => {
    return (
       
<NavbarItem>

   <ul className="hidden lg:flex gap-6 justify-end ml-2">
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

    );
};

export default MainMenu;