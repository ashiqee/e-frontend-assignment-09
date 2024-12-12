import React from "react";
import { Button } from "@nextui-org/button";
import { CircleAlert,  Lock,Unlock } from "lucide-react";
import { toast } from "sonner";

import { useBlacklistShop } from "@/hooks/shops.hook";



const CreateCategoriesModal = ({
 
  setIsOpen,
 
}: {
   
  setIsOpen: any;
 
}) => {


  const handleAddCategory = () => {
    setIsOpen(false); // Close modal only on success
  };
  
  return (
    <>
   <div className="absolute z-50">
   <div className="fixed   z-40 inset-0 bg-slate-500/35 flex flex-col w-full bg-opacity-75  justify-center items-center ">
        <div className="w-[80vw]">
         
          <div
            className=" relative  z-40 min-w-3xl max-w-3xl mx-auto max-h-[90vh] my-auto 
         rounded-xl p-6 overflow-hidden overflow-y-auto 
          bg-gray-900  text-white text-center"
          >
             <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">X</button>
            <div className="space-y-2 flex flex-col ">
             <h2 className="text-xl font-semibold">Add New Category</h2>
             
             
             
             
             </div>

            <div className="flex gap-4 justify-center pt-10">
           
              <Button color="success" onPress={handleAddCategory}>

              Add New Category
              
              </Button>
            </div>
          </div>
        </div>
      </div>
   </div>
    </>
  );
};

export default CreateCategoriesModal;