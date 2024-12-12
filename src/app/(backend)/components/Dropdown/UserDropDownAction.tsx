
'use client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { EllipsisVertical, Lock, UserRoundX } from 'lucide-react';
import React, { useState } from 'react';

import DeleteUserModal from '../Modals/UsersModal/UserDeletedModal';
import SuspendUserModal from '../Modals/UsersModal/UserSuspendModal';

interface IStatus {
    status: "ACTIVE" | "SUSPEND"
}
const UserDropDownAction = ({id,isDeleted,status}:
    {id:string , 
    isDeleted:boolean,
    status:IStatus}) => {
        const [isOpen,setIsOpen]=useState(false)
        const [isSusOpen,setIsSusOpen]=useState(false)
      



    return (
        <>
        <Dropdown>
          <DropdownTrigger>
            <button className="px-4 py-2 flex gap-2 border-1 rounded-md text-white ">
            <EllipsisVertical />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Sort Options"
           
          >
            
            <DropdownItem key="delete" onPress={()=>setIsOpen(true)}>
            <button className='flex items-center gap-2'> 
                
                 <UserRoundX size={16} /> <span>Delete</span>
                 
                 </button>
                
                </DropdownItem>
            <DropdownItem key="suspend"  onPress={()=>setIsSusOpen(true)} >
            
            <button className='flex items-center gap-2'><Lock size={16}/> <span>Suspend</span></button>
                
                </DropdownItem>
            
          </DropdownMenu>
        </Dropdown>
        {
            isOpen && <DeleteUserModal setIsOpen={setIsOpen} userId={id}/>
        }
        {
            isSusOpen && <SuspendUserModal setIsOpen={setIsSusOpen} status={status} userId={id}/>
        }
        </>
    );
};

export default UserDropDownAction;