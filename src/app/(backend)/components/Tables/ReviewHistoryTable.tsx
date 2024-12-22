'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Pagination, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FaStar, FaRegStar } from "react-icons/fa";

import CreateCouponModal from '../Modals/CouponsModal/CreateCouponModal';
import CouponDropDownAction from '../Dropdown/CouponDropDownAction';



const ReviewsHistoryTable = ({reviewData}:{reviewData:any}) => {


 
  const [isAddOpen,setIsAddOpen]= useState(false)

 

  



  console.log(reviewData);
  

  return (
    <>
      {
            isAddOpen && <CreateCouponModal setIsOpen={setIsAddOpen} />
        }
   
{reviewData?.length > 0 &&  <>


  <Table aria-label="Review Management Table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Product Image</TableColumn>
          <TableColumn>Product Name</TableColumn> 
          <TableColumn>Rating</TableColumn> 
          <TableColumn>Comments</TableColumn> 
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody >
          {reviewData?.map((item: any, i: number) => (
            <TableRow key={item.id} className='bg-slate-800/15 rounded-md hover:bg-slate-700/10 hover:rounded-md'>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Image className="w-12 h-12 hover:scale-150" src={item.product.images[0]} />
              </TableCell>
              <TableCell>{item.product.name}</TableCell>
              <TableCell className='flex gap-1 items-center py-5'>
  {Array.from({ length: 5 }, (_, index) => (
    <span className='' key={index}>
      {index < item.rating ? (
        <FaStar  className="text-yellow-500 " /> 
      ) : (
        <FaRegStar className="text-gray-300 " /> 
      )}
    </span>
  ))}
</TableCell>
              <TableCell>{item.comment}</TableCell>
              
              <TableCell>
                    {/* action modal  */}
              <CouponDropDownAction 
              data={[item]}
              id={"item.id"}
              isDeleted={item.isDeleted}
              />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
</>


}
    </>
  );
};

export default ReviewsHistoryTable;
