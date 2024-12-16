'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi"; // Icons
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";

import { roleBasedMenus } from "./RoleBaseSideBarMenu";

import { logout } from "@/services/AuthService";
import { useUser } from "@/context/user.provider";
import Loading from "@/components/shared/Loading";

type Role = 'admin' | 'vendor' | 'customer';

const sidebarVariants = {
  open: { width: "250px", opacity: 1 },
  closed: { width: "80px", opacity: 0.8 },
};

const linkVariants = {
  hover: { scale: 1.05, x: 5, transition: { type: "spring", stiffness: 300 } },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMbOpen, setIsMbOpen] = useState(false);
 
  const {user} = useUser()

  const toggleSidebar = () => setIsOpen(!isOpen);
  const pathName = usePathname()

  
  
  
if(!user){
    return <><Loading/></>
}
  
  const menus = roleBasedMenus[user.role.toLowerCase() as Role] || []
 

  return (
   <div className={` ${!isMbOpen && isOpen ? "md:mr-[250px]  duration-100":"md:mr-[75px]" }`}>
   <button className={`text-right p-3 fixed  right-2 top-2 ${!isMbOpen ? "":"rotate-90"}`} onClick={()=>setIsMbOpen(!isMbOpen)}> ||| </button>
   <motion.aside
      animate={isOpen || isMbOpen ? "open" : "closed"}
      className={`fixed  top-0 left-0 duration-500 h-full ${isMbOpen ? "-translate-x-64":"translate-x-0 "} bg-gray-800 text-white shadow-lg z-50`}
      initial={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="2xl:p-4 p-2 flex items-center justify-between">
        <span className="text-xl font-bold">
          {isOpen ? `${user.role} Panel` : "AP"}
        </span>
        <button
          className="focus:outline-none text-white"
          onClick={toggleSidebar}
        >
          {isOpen ? "<" : ">"}
        </button>

        
      </div>
      
      <nav className="2xl:mt-4 mt-2 flex flex-col justify-between md:h-[80vh] 2xl:h-[85vh]">
        <ul>
            {
                menus?.map((menu:any,i:number)=>(
                    <MenuItem
                    key={i}
                    href={menu.path}
                    icon={menu.icon}
                    isOpen={isOpen}
                    label={menu.label}
                    pathName={pathName}
                  />
                ))
            }
                  
        </ul>
        <div className="mx-4 flex flex-col items-center">
            <Avatar className={ ` ${isOpen ? "md:size-20" : "md:size-8" } size-8 `} src={user?.profilePhoto}/>
           <Link href={`/profile`}> <p>{user?.name}</p></Link>
            <Link href={'/'}><h2 className="2xl:text-4xl md:text-xl  font-extrabold text-center my-6">Kidz Bazar</h2></Link>
        <Button className="md:flex hidden float-end w-full" color="danger" onClick={()=>logout()}> <FiLogOut />{isOpen && "Logout"}</Button>
      
       
        </div>
      </nav>
    </motion.aside>
   </div>
  );
};

type MenuItemProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  pathName: any;
};

const MenuItem = ({ href, label, icon, isOpen, pathName }: MenuItemProps) => {
  return (
    <motion.li
      className={` p-1.5 cursor-pointer flex items-center px-4 ${
        pathName === href ? "bg-slate-700" : ""
      }`}
      variants={linkVariants}
      whileHover="hover"
    >
      <Link passHref href={href}>
        <p className="flex items-center gap-3 w-full text-white">
          <span className={` ${ isOpen ? "text-md":"text-2xl mx-auto text-center"}`}>{icon}</span>
          {isOpen && <span className="text-base text-[12px]">{label}</span>}
        </p>
      </Link>
    </motion.li>
  );
};

export default Sidebar;