"use client"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { logout } from "@/services/AuthService";

export default function ProfileDropDown({user}:{user?:any}) {
  const router = useRouter()
 


  return (
    <Dropdown>
      <DropdownTrigger>
     {
      user ?  <Avatar src={user?.profilePhoto} />: <Avatar />
     }
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
       
        {
          !user ?  <> 
          
          <DropdownItem key="login" onClick={()=>router.push("/login")}>Login</DropdownItem>
          <DropdownItem key="login" onClick={()=>router.push("/register")}>Register</DropdownItem>
          
          </>: <>
          <DropdownItem key="new" onClick={()=>router.push(`/${user.role.toLowerCase()}/dashboard`)}>Dashboard</DropdownItem>
        <DropdownItem key="profile" onClick={()=>router.push(`/${user.role.toLowerCase()}/settings`)}>Profile</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onClick={()=>logout()}>
          Logout
        </DropdownItem>
          </>
        }
      </DropdownMenu>
    </Dropdown>
  );
}
