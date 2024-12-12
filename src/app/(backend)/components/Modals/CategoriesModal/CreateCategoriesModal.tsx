import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { CircleAlert,  Lock,Unlock } from "lucide-react";
import { toast } from "sonner";

import { useBlacklistShop } from "@/hooks/shops.hook";
import TRForm from "@/components/forms/TRFrom";
import TRInput from "@/components/forms/TRInput";
import { Input, Textarea } from "@nextui-org/input";
import { useCreateCategory } from "@/hooks/categories.hook";
import TRTextarea from "@/components/forms/TRTextarea";



const CreateCategoriesModal = ({
 
  setIsOpen,
 
}: {
   
  setIsOpen: any;
 
}) => {
  const [image, setImage] = useState<File | null>(null);
 
  const createCategoryMutation = useCreateCategory()


  const onSubmit = async (data: any) => {
   

    // Create a FormData object
    const formData = new FormData();

    // Add JSON data
    const categoriesData={
       
        category: {
          name: data.name,
          description: data.description,
                   
        },
      }
    

    formData.append("data", JSON.stringify(categoriesData));

    if (image) {
      formData.append("file", image);
    }

   
    // Pass the FormData to the mutation handler
    createCategoryMutation.mutate(formData);

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
        <div className="max-w-[30vw]">
         
          <div
            className=" relative  z-40 min-w-3xl max-w-3xl mx-auto max-h-[90vh] my-auto 
         rounded-xl p-6 overflow-hidden overflow-y-auto 
          bg-gray-900  text-white text-center"
          >
             <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">X</button>
            <div className="space-y-2 flex flex-col ">
             <h2 className="text-xl font-semibold">Add New Category</h2>
             
             <TRForm
       
        onSubmit={onSubmit}
       
      >
        <div className="py-1.5 flex gap-4">
          {" "}
          <TRInput isRequired label="Category Name" name="name" type="text" />
         
        </div>
        <div className="py-1.5 flex gap-4">
       <TRTextarea
          label="Category Description"
          name="description"
          rows={1}
          type="text"
        />
          
        </div>
       
        <div className="py-1.5">
         
        <Input
        accept="image/*"
          label="Category Image"
          type="file"
          onChange={handleFileChange}
        />
        </div>
      

        <div className="flex mt-4 gap-2 justify-end">
          <Button fullWidth color="primary" type="submit">
            Add New Category 
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

export default CreateCategoriesModal;