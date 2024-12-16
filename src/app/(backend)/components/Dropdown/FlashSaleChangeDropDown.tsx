
'use client'
import { updateOrderItemStatus } from '@/services/OrderServices';
import { updateFlashSaleStatus } from '@/services/ProductsServices';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';

import React, { useState } from 'react';
import { toast } from 'sonner';



const FlashSaleStatusChangeDropdown = ({id,status}:
    {id:string , 
   
    status:any}) => {
        
        const [currentStatus, setStatus] = useState(status);
        const [isLoading, setIsLoading] = useState(false);

        const queryClient = useQueryClient()
       

  const handleStatusChange = async (key:any) => {
    setStatus(key); // Update the selected status
    const flashStatus ={status: key};
    const res = await updateFlashSaleStatus(flashStatus,id)
    setIsLoading(true);
    isLoading && toast.loading("Loading...");

    if(res.success){
      
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate the 'users' cache
      setIsLoading(false);
      toast.success(res.massage);
      
    
    }
    

  };
        
      



    return (
        <>
        <Dropdown>
          <DropdownTrigger>
            <button className={`
              ${currentStatus ? "bg-red-600":"bg-slate-400/15"}
              px-1 py-1 flex gap-2 border-1 rounded-md text-white`}>
            {currentStatus ? "Running":"Not running"}
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Sort Options"
            selectedKeys={[currentStatus]} // Set the current selection
            
           
          >
                       
            <DropdownItem key="run"  onPress={()=>handleStatusChange(true)} >
          
            Flash sell running
            </DropdownItem>
            <DropdownItem key="stop"  onPress={()=>handleStatusChange(false)} >
          
            
            Flash sell stop
            </DropdownItem>
          
            
          </DropdownMenu>
        </Dropdown>
     
        </>
    );
};

export default FlashSaleStatusChangeDropdown;