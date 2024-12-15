"use client"
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { CheckCheck, CircleAlert,  ListOrdered,  Lock,ShoppingBag,Trash,Unlock } from "lucide-react";
import { toast } from "sonner";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";


import { useDeleteProduct } from "@/hooks/products.hook";
import { CheckboxGroup } from "@nextui-org/react";
import { useDeleteCartItem, useGetCartsItems } from "@/hooks/carts.hook";
import { useRouter } from "next/navigation";
import Link from "next/link";



const CartsPage = () => {

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

console.log(cartsItemResult);

  return (
    <>
   <div className="mt-10">
   <div className=" inset-0  flex flex-col  h-fit  w-full bg-opacity-75  justify-center items-center ">
        <div className="w-full">
          <div
            className=" relative  z-40 flex flex-col  justify-between  my-auto 
         rounded-xl p-10 overflow-hidden overflow-y-auto 
          bg-gray-900  text-white text-center"
          >
            <div ref={modalRef} className="space-y-2 flex flex-col  justify-center items-center">
              <h3 className="text-2xl">Checkout</h3>

<Table removeWrapper  aria-label="Cart Product collection table">
      <TableHeader>
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
          src={item.product.images[0] || "https://via.placeholder.com/80"} 
          alt={item.product.name} 
          className="w-20 h-20 object-cover rounded-lg"
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

            <div className=" text-[16px] my-2">
                <div className="flex w-full p-2 pr-52 gap-20 items-end justify-end">
                   <p> Total Items : {cartsItemResult.data.totalQuantity}</p>
                    <p >SubTolal: {(cartsItemResult.data.subtotal).toFixed(2)}</p>
                </div>
             <div className="flex gap-4 justify-end pt-10">
             
              <Button color="secondary" onPress={()=>router.push("/shop")}>

              <ShoppingBag /> Shop More
              
              </Button>
              <Button color="danger" onPress={()=>router.push("/checkout")}>

              <ListOrdered /> Check Out
              
              </Button>
             </div>
            </div>
          </div>
        </div>
      </div>
   </div>
    </>
  );
};

export default CartsPage;