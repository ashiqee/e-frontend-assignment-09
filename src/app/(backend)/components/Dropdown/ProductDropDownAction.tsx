
'use client'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Copy, Edit3, EllipsisVertical, Trash } from 'lucide-react';
import React, { useState } from 'react';


import EditProductModal from '../Modals/ShopsModal/EditProductModal';
import DuplicateProductModal from '../Modals/ShopsModal/DuplicateProductModal';
import DeleteProductModal from '../Modals/ProductsModal/DeleteProductModal';


const ProductDropDownAction = ({id,data,shops,categories}:
    {
    id:string , 
    shops:any,
    data:any,
    categories:any
  }) => {
        const [isOpen,setIsOpen]=useState(false)
        const [isDpOpen,setIsDpOpen]=useState(false)
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
            aria-label="Edit Options"
           
          >
            
           
            <DropdownItem key="editShop"  onPress={()=>setIsOpen(true)} >
            
            <button className='flex items-center gap-2'>
              
            <Edit3 size={16}/> Edit Product
              
              </button>
                
                </DropdownItem>

            <DropdownItem key="duplicate"  onPress={()=>setIsDpOpen(true)} >
            
            <button className='flex items-center gap-2'>
              
            <Copy size={16}/> Duplicate Product
              
              </button>
                
                </DropdownItem>

            <DropdownItem key="delete"  onPress={()=>setIsDelOpen(true)} >
            
            <button className='flex items-center gap-2'>
              
            <Trash size={16}/> Delete Product
              
              </button>
                
                </DropdownItem>
            
          </DropdownMenu>
        </Dropdown>
        {
            isOpen && <EditProductModal
            categories={categories}
            exitsData={data} 
            id={id}
            setIsOpen={setIsOpen}
            shops={shops} 
            
            />
        }
        {
            isDpOpen && <DuplicateProductModal
            categories={categories}
            exitsData={data} 
            id={id}
            setIsOpen={setIsDpOpen}
            shops={shops} 
            
            />
        }

{
            isDeleteOpen && <DeleteProductModal id={id} setIsOpen={setIsDelOpen} status={status}/>
        }
        
        </>
    );
};

export default ProductDropDownAction;