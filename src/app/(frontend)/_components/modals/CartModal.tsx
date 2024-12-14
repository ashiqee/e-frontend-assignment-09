import React, { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { CheckCheck, CircleAlert,  Lock,Trash,Unlock } from "lucide-react";
import { toast } from "sonner";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";


import { useDeleteProduct } from "@/hooks/products.hook";
import { CheckboxGroup } from "@nextui-org/react";
import { useGetCartsItems } from "@/hooks/carts.hook";



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
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleDeleteCategory = () => {
        if (!id) return; 
        deleteProductMutation.mutate(id, {
          onSuccess: () => {
            toast.success(`Product deleted successfully`);
            setIsOpen(false); // Close modal only on success
          },
          onError: (error) => {
            console.error(error); // Log error for debugging
            toast.error("Failed to Delete Product");
          },
        });
      };
      

    //   outside click closed modal 


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

  return (
    <>
   <div className="absolute bottom-0 z-50">
   <div className="fixed  top-0  z-40 inset-0 bg-slate-500/35 flex  w-full bg-opacity-75  justify-end items-center ">
        <div className="w-76">
          <div
            className=" relative  z-40 min-w-3xl max-w-3xl flex flex-col justify-between mx-auto min-h-screen my-auto 
         rounded-xl p-10 overflow-hidden overflow-y-auto 
          bg-gray-900  text-white text-center"
          >
            <div ref={modalRef} className="space-y-2 flex flex-col max-w-[20vw] justify-center items-center">
              <h3 className="text-2xl">Carts List</h3>

<Table removeWrapper  aria-label="Cart Product collection table">
      <TableHeader>
        <TableColumn>-</TableColumn>
        <TableColumn>Image</TableColumn>
        <TableColumn>Product info</TableColumn>
        <TableColumn>Quantity</TableColumn>
        <TableColumn>Total</TableColumn>
      </TableHeader>
      <TableBody className=" bg-slate-500/5">
  {cartsItemResult?.data?.map((item) => (

<TableRow key={item.id}>
    <TableCell>
        <Trash size={14}/>
    </TableCell>
<TableCell>
    <img 
          src={item.product.images[0] || "https://via.placeholder.com/80"} 
          alt={item.product.name} 
          className="w-12 h-12 object-cover rounded-lg"
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
    // <li key={item.id} className="flex justify-between text-[10px] w-72 items-center p-2 border-b border-gray-200">
    //   <div className="flex items-center space-x-4">
    //     {/* Product Image (optional) */}
    //     <img 
    //       src={item.product.images[0] || "https://via.placeholder.com/80"} 
    //       alt={item.product.name} 
    //       className="w-12 h-12 object-cover rounded-lg"
    //     />
    //     <div>
    //       <h3 className="text-[10px] text-left font-medium ">{item.product.name}</h3>
    //  </div>
    //   </div>

    //   {/* Product Price and Quantity */}
    //   <div className="flex items-center space-x-4">
    //     <span className=" font-semibold ">{item.product.price}</span>
    //     <span className="text-gray-600">Quantity: {item.quantity}</span>
    //   </div>

    //   {/* Total Price */}
    //   <div className=" font-semibold ">
    //     {(item.product.price * item.quantity).toFixed(2)}
    //   </div>
    // </li>
  ))}
    </TableBody>
    </Table>



            </div>

            <div className="flex gap-4 justify-center pt-10">
              <Button color="warning" onPress={() => setIsOpen(false)}>
                Close
              </Button>
              <Button color="danger" onPress={handleDeleteCategory}>

              <CheckCheck /> Checkout
              
              </Button>
            </div>
          </div>
        </div>
      </div>
   </div>
    </>
  );
};

export default CartsModal;