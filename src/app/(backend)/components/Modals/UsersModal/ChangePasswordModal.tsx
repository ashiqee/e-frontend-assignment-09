import React from "react";
import { Button } from "@nextui-org/button";
import { CircleAlert,  Lock,Unlock } from "lucide-react";
import { toast } from "sonner";

import {  useSuspendUser } from "@/hooks/users.hook";
import TRForm from "@/components/forms/TRFrom";
import TRInput from "@/components/forms/TRInput";



const ChangePasswordModal = ({
  userId,
  setIsOpen,
  status
}: {
    userId: string;
  setIsOpen: any;
  status:any;
}) => {


    const handleChangePassword = () => {
       
      };
      

  return (
    <>
   <div className="absolute z-50">
   <div className="fixed   z-40 inset-0 bg-slate-500/35 flex flex-col w-full bg-opacity-75  justify-center items-center ">
        <div className="w-96">
          <div
            className=" relative  z-40 min-w-3xl max-w-3xl mx-auto max-h-[90vh] my-auto 
         rounded-xl p-10 overflow-hidden overflow-y-auto 
          bg-gray-900  text-white text-center"
          >
               <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>X</button>
          
            <div className="space-y-2 flex flex-col justify-center items-center">
            <h2 className="text-2xl " >Reset password</h2>
<small>no worries! we are here!</small>

          </div>
          <TRForm  onSubmit={handleChangePassword}>
           <div className='space-y-3'>
           <TRInput label='Old Password' name='oldPassword' size='sm' type='password' />
            <TRInput label='New Password' name='newPassword' size='sm' type='password' />
           
            <Button fullWidth type='submit'  className="my-4" size='sm'>Change pasword</Button>
        
           </div>
          </TRForm>
          </div>
        </div>
      </div>
   </div>
    </>
  );
};

export default ChangePasswordModal;