import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { useUpdateVendorShop } from "@/hooks/shops.hook";
import TRForm from "@/components/forms/TRFrom";
import TRInput from "@/components/forms/TRInput";
import TRTextarea from "@/components/forms/TRTextarea";



const EditVendorShopModal = ({
 id,
  setIsOpen,
  exitsData
 
}: {
   id:any;
  setIsOpen: any;
 exitsData:any
}) => {
  const [image, setImage] = useState<File | null>(null);
 
  const updateVendorShopMutation = useUpdateVendorShop()


  const onSubmit = async (data: any) => {
   

    // update a FormData object
    const formData = new FormData();

    // Add JSON data
    const updateShopsData = {
      name: data.name,
      description: data.description,
    };
    

    formData.append("data", JSON.stringify(updateShopsData));

    if (image) {
      formData.append("file", image);
    }

    // Pass the FormData to the mutation handler
    updateVendorShopMutation.mutate({ id, formData });

    // Trigger loading state
    setIsOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
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
             <h2 className="text-xl font-semibold">Edit Shop Information</h2>
             
             <TRForm
        defaultValues={{
          name: exitsData.name,
          description: exitsData.description,
         
        }}
        onSubmit={onSubmit}
       
      >
        <div className="py-1.5 flex gap-4">
          {" "}
          <TRInput isRequired label="Shop Name" name="name" type="text" />
         
        </div>
        <div className="py-1.5 flex gap-4">
       <TRTextarea
          label="Shop Description"
          name="description"
          rows={1}
          type="text"
        />
          
        </div>
       
        <div className="py-1.5">
         
        <Input
        accept="image/*"
          label="Shop logo"
          type="file"
          onChange={handleFileChange}
        />
        </div>
      

        <div className="flex mt-4 gap-2 justify-end">
          <Button fullWidth color="primary" type="submit">
            Update Category 
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

export default EditVendorShopModal;