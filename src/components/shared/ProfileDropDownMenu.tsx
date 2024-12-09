"use client"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";

import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";

export default function ProfileDropDown({user}:{user:any}) {
  const router = useRouter()
 


  return (
    <Dropdown>
      <DropdownTrigger>
      <Avatar src={user.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
       
        <DropdownItem onClick={()=>router.push(`/${user.role.toLowerCase()}/profile`)} key="new">Profile</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onClick={()=>logout()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
