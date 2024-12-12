import React from "react";
import { Button } from "@nextui-org/button";
import { CircleAlert,  Lock,Trash,Unlock } from "lucide-react";
import { toast } from "sonner";

import { useBlacklistShop } from "@/hooks/shops.hook";
import { useDeleteCategory } from "@/hooks/categories.hook";



const DeleteCategoriesModal = ({
  id,
  setIsOpen,
  status
}: {
    id: string;
  setIsOpen: any;
  status:any;
}) => {

    const deleteCategoryMutation = useDeleteCategory()

    const handleDeleteCategory = () => {
        if (!id) return; 
        deleteCategoryMutation.mutate(id, {
          onSuccess: () => {
            toast.success(`Category deleted successfully`);
            setIsOpen(false); // Close modal only on success
          },
          onError: (error) => {
            console.error(error); // Log error for debugging
            toast.error("Failed to Delete category");
          },
        });
      };
      

  return (
    <>
   <div className="absolute z-50">
   <div className="fixed   z-40 inset-0 bg-slate-500/35 flex flex-col w-full bg-opacity-75  justify-center items-center ">
        <div className="w-[40vw]">
          <div
            className=" relative  z-40 min-w-3xl max-w-3xl mx-auto max-h-[90vh] my-auto 
         rounded-xl p-10 overflow-hidden overflow-y-auto 
          bg-gray-900  text-white text-center"
          >
            <div className="space-y-2 flex flex-col justify-center items-center">
              <h3 className="text-3xl">Are you sure  
                delete this category?</h3>
              <p>Please confirm</p>
              <CircleAlert color="red" size={60} />
            </div>

            <div className="flex gap-4 justify-center pt-10">
              <Button color="warning" onPress={() => setIsOpen(false)}>
                No
              </Button>
              <Button color="danger" onPress={handleDeleteCategory}>

              <Trash size={16}/> Yes Delete it!
              
              </Button>
            </div>
          </div>
        </div>
      </div>
   </div>
    </>
  );
};

export default DeleteCategoriesModal;