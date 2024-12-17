import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import TRForm from "@/components/forms/TRFrom";
import TRInput from "@/components/forms/TRInput";
import { useCreateCategory } from "@/hooks/categories.hook";
import TRTextarea from "@/components/forms/TRTextarea";
import { createcoupons } from "@/services/AdminServices/ManageCoupon";



const CreateCouponModal = ({
 
  setIsOpen,
 
}: {
   
  setIsOpen: any;
 
}) => {
 


  const onSubmit = async (data: any) => {
   

    const res = await createcoupons(data)
  
console.log(res);

    // Trigger loading state
    setIsOpen(false);
  };



  
  return (
    <>
   <div className="absolute z-50">
   <div className="fixed   z-40 inset-0 bg-slate-500/35 flex flex-col w-full bg-opacity-75  justify-center items-center ">
        <div className="md:max-w-[30vw]">
         
          <div
            className=" relative  z-40 min-w-3xl max-w-3xl mx-auto max-h-[90vh] my-auto 
         rounded-xl p-6 overflow-hidden overflow-y-auto 
          bg-gray-900  text-white text-center"
          >
             <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>X</button>
            <div className="space-y-2 flex flex-col ">
             <h2 className="text-xl font-semibold">Add New Coupon</h2>
             
             <TRForm
       
        onSubmit={onSubmit}
       
      >
        <div className="py-1.5 flex gap-4">
          {" "}
          <TRInput isRequired label="Coupon Code" name="code" type="text" />
         
        </div>
        <div className="py-1.5 flex gap-4">
          {" "}
          <TRInput isRequired label="Discount Percentage" name="discountPercentage" type="number" />
         
        </div>

        <div className="py-1.5 flex gap-4">
          {" "}
          <TRInput isRequired label="Expiration Date" name="expirationDate" type="date" />
         
        </div>


            
      

        <div className="flex mt-4 gap-2 justify-end">
          <Button fullWidth color="primary" type="submit">
            Add New Coupon 
          </Button>
        </div>
      
      </TRForm>
             
             
             
             </div>

          </div>
        </div>
      </div>
   </div>
    </>
  );
};

export default CreateCouponModal;