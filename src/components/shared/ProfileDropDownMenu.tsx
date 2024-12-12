"use client"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { logout } from "@/services/AuthService";

export default function ProfileDropDown({user}:{user:any}) {
  const router = useRouter()
 


  return (
    <Dropdown>
      <DropdownTrigger>
      <Avatar src={user.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
       
        <DropdownItem key="new" onClick={()=>router.push(`/${user.role.toLowerCase()}/dashboard`)}>Dashboard</DropdownItem>
        <DropdownItem key="new" onClick={()=>router.push(`/${user.role.toLowerCase()}/settings`)}>Settings</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onClick={()=>logout()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
