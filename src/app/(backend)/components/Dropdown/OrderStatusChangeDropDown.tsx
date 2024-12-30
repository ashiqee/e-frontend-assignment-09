
'use client'
import { updateOrderItemStatus } from '@/services/OrderServices';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';

import React, { useState } from 'react';
import { toast } from 'sonner';



const OrderStatusChangeDropdown = ({orderItemId,status}:
    {orderItemId:string , 
   
    status:any}) => {
        
        const [currentStatus, setStatus] = useState(status);
        const queryClient = useQueryClient()

  const handleStatusChange = async (key:any) => {
    setStatus(key); // Update the selected status
    const orderStatus ={status: key};
    const res = await updateOrderItemStatus(orderStatus,orderItemId)

    if(res.success){
      toast.success(res.message)
      queryClient.invalidateQueries({ queryKey: ['shops'] }); // Invalidate the 'users' cache
    
    }
    

  };
        
      



    return (
        <>
        <Dropdown>
          <DropdownTrigger>
            <button className={`
              ${currentStatus === "PENDING" && "bg-pink-600/25"}
              ${currentStatus === "SHIPPED" && "bg-yellow-600/25"}
              ${currentStatus === "DELIVERED" && "bg-green-600/25"}
              ${currentStatus === "CANCELED" && "bg-red-600/75"}
              px-4 py-2 flex gap-2 min-w-28 text-center  border-1 rounded-md`}>
            {currentStatus}
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Sort Options"
            selectedKeys={[currentStatus]} // Set the current selection
            
           
          >
                       
            <DropdownItem key="PENDING"  onPress={()=>handleStatusChange("PENDING")} >
          
            PENDING
            </DropdownItem>
            <DropdownItem key="SHIPPED"  onPress={()=>handleStatusChange("SHIPPED" )} >
          
            SHIPPED
            </DropdownItem>
            <DropdownItem key="DELIVERED"  onPress={()=>handleStatusChange("DELIVERED")} >
          
            DELIVERED
            </DropdownItem>
            <DropdownItem key="CANCELED"  onPress={()=>handleStatusChange("CANCELED")} >
          
            CANCELED
            </DropdownItem>
            
          </DropdownMenu>
        </Dropdown>
     
        </>
    );
};

export default OrderStatusChangeDropdown;