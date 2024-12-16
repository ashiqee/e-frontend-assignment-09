import React, { useEffect, useRef } from "react";
import { Button } from "@nextui-org/button";
import { CheckCheck,Trash } from "lucide-react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { useDeleteProduct } from "@/hooks/products.hook";
import { useDeleteCartItem, useGetCartsItems } from "@/hooks/carts.hook";




const CartsModal = ({
  id,
  setIsOpen,
  cartsData,
  isOpen
}: {
    id: string;
  setIsOpen: any;
  isOpen:boolean;
  cartsData:any;
}) => {

    const deleteProductMutation = useDeleteProduct()
    const {data:cartsItemResult,refetch ,isLoading}= useGetCartsItems()
    const deleteCartItemMutation = useDeleteCartItem()
    const modalRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter()


 

    useEffect(()=>{
        const handleOutsideClick = (event:any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
              setIsOpen(false);
            }
          };
      
          if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
          }
      
          return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
          };
        }, [isOpen, setIsOpen]);


        const handleDeleteCartItem = (id:string)=>{

            alert(id)
            deleteCartItemMutation.mutate(id)

        }

        if(isLoading){
            return <>Loading...</>
        }

  return (
    <>
   <div className="absolute bottom-0 z-50">
   <div className="fixed  top-0  z-40 inset-0 bg-slate-500/35 flex  w-full bg-opacity-75  justify-end items-center ">
        <div className="md:w-76 w-full p-3">
          <div
            className=" relative  z-40 md:min-w-3xl md:max-w-3xl flex flex-col justify-between mx-auto md:min-h-screen my-auto 
         rounded-xl md:p-10 p-2 overflow-hidden overflow-y-auto 
          bg-gray-900  text-white text-center"
          >
            <div ref={modalRef} className="space-y-2  flex flex-col md:max-w-[20vw] justify-center items-center">
              <h3 className="text-2xl py-4">Carts List</h3>

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
    <img 
          alt={item.product.name} 
          className="w-12 h-12 object-cover rounded-lg" 
          src={item.product.images[0] || "https://via.placeholder.com/80"}
        />
        
        </TableCell>
<TableCell><h3 className="text-[10px] text-left font-medium ">{item.product.name}
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

            <div className="  my-2">
                <div className="flex w-full p-2 border gap-4 justify-between">
                   <p> Total Items : {cartsItemResult.data.totalQuantity}</p>
                    <p>SubTolal: {cartsItemResult.data.subtotal}</p>
                </div>
             <div className="flex gap-4 justify-center pt-10">
             <Button color="warning"  onPress={()=>router.push("/cart")}>
                View Cart
              </Button>
              <Button color="success" onPress={()=>router.push("/checkout")}>

              <CheckCheck /> Checkout
              
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

export default CartsModal;