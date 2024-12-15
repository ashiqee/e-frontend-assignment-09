"use client"
import React, { useRef } from "react";
import {Trash } from "lucide-react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import CheckoutForm from "./CheckoutForm";

import { useDeleteCartItem, useGetCartsItems } from "@/hooks/carts.hook";



const CheckoutPage = ({user}:{user:any}) => {

    const {data:cartsItemResult,refetch ,isLoading}= useGetCartsItems()
    const deleteCartItemMutation = useDeleteCartItem()
    const modalRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter()


 


        const handleDeleteCartItem = (id:string)=>{

            alert(id)
            deleteCartItemMutation.mutate(id)

        }

if(isLoading){
  return <>Loading...</>
}

  return (
    <>
   <div className="mt-10 md:flex ">
   <div className=" inset-0  flex flex-col  h-fit  w-full bg-opacity-75  justify-center items-center ">
        <div className="w-full ">
          <div
            className="  z-40 flex flex-col min-h-[400px] justify-between mx-auto  my-auto 
         rounded-xl p-10 overflow-hidden overflow-y-auto 
          dark:bg-gray-900 bg-gray-300/25 dark:text-white "
          >
            <div ref={modalRef} className="space-y-2 ">
              <h3 className="text-xl">Items Summary</h3>

<Table removeWrapper  aria-label="Cart Product collection table">
      <TableHeader >
        <TableColumn>-</TableColumn>
        <TableColumn>Image</TableColumn>
        <TableColumn>Product info</TableColumn>
        <TableColumn>Quantity</TableColumn>
        <TableColumn>Total</TableColumn>
      </TableHeader>
      <TableBody className=" bg-slate-500/5">
  {cartsItemResult?.data?.cartItems?.map((item:any) => (

<TableRow key={item.id}>
    <TableCell>
     <button onClick={()=>handleDeleteCartItem(item.product.id)}>   <Trash size={14}/></button>
    </TableCell>
<TableCell>
  <Link href={`/shop/${item.product.id}`}>
  <img 
          alt={item.product.name} 
          className="w-20 h-20 object-cover rounded-lg" 
          src={item.product.images[0] || "https://via.placeholder.com/80"}
        />
  </Link>
        
        </TableCell>
<TableCell><h3 className="text-[14px] text-left font-medium ">{item.product.name}
    <br />
<span className=" font-semibold ">{item.product.price}
</span>
    
    </h3></TableCell>
<TableCell><span className="">{item.quantity}</span></TableCell>

<TableCell><span className="">{(item.product.price * item.quantity).toFixed(2)}</span></TableCell>
</TableRow>
   
  ))}
    </TableBody>
    </Table>



            </div>

          
          </div>
        </div>
      </div>
      <CheckoutForm cartItems={cartsItemResult?.data}  user={user}/>
   </div>
    </>
  );
};

export default CheckoutPage;