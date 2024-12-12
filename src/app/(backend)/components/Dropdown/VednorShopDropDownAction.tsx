
'use client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Edit3, EllipsisVertical, Lock, Unlock } from 'lucide-react';
import React, { useState } from 'react';


import EditVendorShopModal from '../Modals/ShopsModal/EditShopModal';


const VendorShopDropDownAction = ({id,isDeleted,data}:
    {id:string , 
    isDeleted:boolean,
    data:any}) => {
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
            
           
            <DropdownItem key="editShop"  onPress={()=>setIsOpen(true)} >
            
            <button className='flex items-center gap-2'>
              
            <Edit3 size={16}/> Edit Shop
              
              </button>
                
                </DropdownItem>
            
          </DropdownMenu>
        </Dropdown>
        {
            isOpen && <EditVendorShopModal setIsOpen={setIsOpen} exitsData={data} id={id}/>
        }
        
        </>
    );
};

export default VendorShopDropDownAction;