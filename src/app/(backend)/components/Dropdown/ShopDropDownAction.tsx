
'use client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { EllipsisVertical, Lock, Unlock, UserRoundX } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DeleteUserModal from '../Modals/UsersModal/UserDeletedModal';
import { useGetAllUsers } from '@/hooks/users.hook';
import SuspendUserModal from '../Modals/UsersModal/UserSuspendModal';
import BlackListedShopModal from '../Modals/ShopsModal/ShopBlacklistedModal';


const ShopDropDownAction = ({id,isDeleted,status}:
    {id:string , 
    isDeleted:boolean,
    status:any}) => {
        const [isOpen,setIsOpen]=useState(false)
        
      



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
            
           
            <DropdownItem onPress={()=>setIsOpen(true)}  key="suspend" >
            
            <button className='flex items-center gap-2'>
              
            {status === "ACTIVE" ? 
               <><Lock size={16}/> Blacklist </>
              :
              <><Unlock size={16}/> Active </>
              }
              
              </button>
                
                </DropdownItem>
            
          </DropdownMenu>
        </Dropdown>
        {
            isOpen && <BlackListedShopModal status={status} userId={id} setIsOpen={setIsOpen}/>
        }
        
        </>
    );
};

export default ShopDropDownAction;