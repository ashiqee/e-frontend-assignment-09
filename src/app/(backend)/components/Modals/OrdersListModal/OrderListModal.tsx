import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";


import TRForm from "@/components/forms/TRFrom";
import TRInput from "@/components/forms/TRInput";
import TRTextarea from "@/components/forms/TRTextarea";
import TRSelect from "@/components/forms/TRSelect";
import { useUpdateProduct } from "@/hooks/products.hook";
import { Image } from "@nextui-org/react";



const OrderListModal = ({
  exitsData,
  setIsOpen,
 
}: {
  
  exitsData:any;
   
  setIsOpen: any;
 
}) => {
  const [images, setImages] = useState<File[]>([]);
 
  const updateProductMutation = useUpdateProduct()


  console.log(exitsData);
  



  
  return (
    <>
   <div className="absolute z-50">
   <div className="fixed   z-40 inset-0 bg-slate-500/35 flex flex-col w-full bg-opacity-75  justify-center items-center ">
        <div className="md:max-w-[70vw] ">
         
          <div
            className=" relative  z-40 md:min-w-3xl md:max-w-3xl mx-auto max-h-[90vh] my-auto 
         rounded-xl p-6 overflow-hidden overflow-y-auto 
          bg-gray-900  text-white text-center"
          >
             <button className="absolute top-4 right-4" onClick={() => setIsOpen('')}>X</button>
            <div className="space-y-2 flex flex-col ">
             <h2 className="text-xl font-semibold">Order List</h2>
          <div className="flex items-center justify-between">
          <p className="py-4">
          ORDER-ID-{exitsData[0]?.orderId}
           </p>
           <p className="py-4">
           Delivery Status: {exitsData[0]?.orderStatus}
           </p>
          </div>
<div className="grid grid-cols-1 gap-4 ">
{
    exitsData?.map((item:any)=>(
      <div key={item.id.toString()} className="flex border w-full p-2 rounded-md justify-between items-center gap-4">
        
        
        <p>{item.id}</p>
      <Image className="size-20" src={item?.product?.images[0]} />

<h2>{item?.product?.name}</h2>
<h2>{item?.quantity}</h2>
<h2>BDT {item?.price}</h2>
<Button variant="bordered">Give Review</Button>
      </div>
    ))
   }
       </div>      
             </div>

          </div>
        </div>
      </div>
   </div>
    </>
  );
};

export default OrderListModal;