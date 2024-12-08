"use client"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";

import { logout } from "@/services/AuthService";

export default function ProfileDropDown({user}:{user:any}) {
 

  return (
    <Dropdown>
      <DropdownTrigger>
      <Avatar src={user.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
       
        <DropdownItem key="new">Profile</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onClick={()=>logout()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
