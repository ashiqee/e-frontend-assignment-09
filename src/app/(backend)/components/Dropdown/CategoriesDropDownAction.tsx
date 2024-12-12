
'use client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import React, { useState } from 'react';


import EditCategoriesModal from '../Modals/CategoriesModal/EditCategoriesModal';
import DeleteCategoriesModal from '../Modals/CategoriesModal/DeleteCategoriesModal';


const CategoriesDropDownAction = ({id,isDeleted,data}:
    {id:string , 
    isDeleted:boolean,
    data:any}) => {
        const [isOpen,setIsOpen]=useState(false)
        
        const [isDeleteOpen,setIsDelOpen]=useState(false)
        
      



    return (
        <>
        <Dropdown>
          <DropdownTrigger>
            <button className="px-4 py-2 flex gap-2 rounded-md text-white ">
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
            isOpen && <EditCategoriesModal exitsData={data} id={id} setIsOpen={setIsOpen}/>
        }
        {
            isDeleteOpen && <DeleteCategoriesModal id={id} setIsOpen={setIsDelOpen} status={status}/>
        }
        
        </>
    );
};

export default CategoriesDropDownAction;