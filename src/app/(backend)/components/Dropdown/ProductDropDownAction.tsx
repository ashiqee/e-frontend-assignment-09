
'use client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Copy, Edit3, EllipsisVertical, Trash } from 'lucide-react';
import React, { useState } from 'react';


import EditProductModal from '../Modals/ShopsModal/EditProductModal';


const ProductDropDownAction = ({id,isDeleted,data,shops,categories}:
    {id:string , 
    isDeleted:boolean,
    shops:any,
    data:any,
    categories:any
  }) => {
        const [isOpen,setIsOpen]=useState(false)
        
      



    return (
        <>
        <Dropdown>
          <DropdownTrigger>
            <button className="px-4 py-2 flex gap-2 rounded-md text-white ">
            <EllipsisVertical />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Edit Options"
           
          >
            
           
            <DropdownItem key="editShop"  onPress={()=>setIsOpen(true)} >
            
            <button className='flex items-center gap-2'>
              
            <Edit3 size={16}/> Edit Product
              
              </button>
                
                </DropdownItem>

            <DropdownItem key="duplicate"  onPress={()=>setIsOpen(true)} >
            
            <button className='flex items-center gap-2'>
              
            <Copy size={16}/> Duplicate Product
              
              </button>
                
                </DropdownItem>

            <DropdownItem key="delete"  onPress={()=>setIsOpen(true)} >
            
            <button className='flex items-center gap-2'>
              
            <Trash size={16}/> Delete Product
              
              </button>
                
                </DropdownItem>
            
          </DropdownMenu>
        </Dropdown>
        {
            isOpen && <EditProductModal
            exitsData={data} 
            categories={categories}
            id={id} 
            shops={shops}
            setIsOpen={setIsOpen}
            
            />
        }
        
        </>
    );
};

export default ProductDropDownAction;