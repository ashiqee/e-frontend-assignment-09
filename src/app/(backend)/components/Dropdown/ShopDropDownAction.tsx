
'use client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { EllipsisVertical, Lock, Unlock } from 'lucide-react';
import React, { useState } from 'react';


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
            
           
            <DropdownItem key="suspend"  onPress={()=>setIsOpen(true)} >
            
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
            isOpen && <BlackListedShopModal setIsOpen={setIsOpen} status={status} userId={id}/>
        }
        
        </>
    );
};

export default ShopDropDownAction;