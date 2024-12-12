
'use client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Edit, EllipsisVertical, Lock, Trash, Unlock } from 'lucide-react';
import React, { useState } from 'react';


import EditCategoriesModal from '../Modals/CategoriesModal/EditCategoriesModal';
import DeleteCategoriesModal from '../Modals/CategoriesModal/DeleteCategoriesModal';


const CategoriesDropDownAction = ({id,isDeleted,status}:
    {id:string , 
    isDeleted:boolean,
    status:any}) => {
        const [isOpen,setIsOpen]=useState(false)
        
        const [isDeleteOpen,setIsDelOpen]=useState(false)
        
      



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
            
           
            <DropdownItem key="edit"  onPress={()=>setIsOpen(true)} >
            
            <button className='flex items-center gap-2'>
          <Edit size={16}/> Edit 
                          
              </button>
                
                </DropdownItem>
            <DropdownItem key="delete"  onPress={()=>setIsDelOpen(true)} >
            
            <button className='flex items-center gap-2'>
          <Trash size={16}/> Delete 
                          
              </button>
                
                </DropdownItem>
            
          </DropdownMenu>
        </Dropdown>
        {
            isOpen && <EditCategoriesModal setIsOpen={setIsOpen} status={status} id={id}/>
        }
        {
            isDeleteOpen && <DeleteCategoriesModal setIsOpen={setIsDelOpen} status={status} id={id}/>
        }
        
        </>
    );
};

export default CategoriesDropDownAction;