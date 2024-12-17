"use client"
import { ArrowLeft, Key } from 'lucide-react';
import React from 'react';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import TRForm from '@/components/forms/TRFrom';
import TRInput from '@/components/forms/TRInput';
import {  resetPassword } from '@/services/AuthService';
import { toast } from 'sonner';


const ResetPassword = () => {

    const handleSendPassword= async(data:any)=>{
     
      
      const res=   await resetPassword(data)

      if(res.data){
        toast.success("Reset password link send")
      }
    }

    return (
        <div className='border border-slate-500/45 shadow-md text-center rounded-xl bg-slate-600/5 p-10'>
          
          <div className='flex p-5  mb-5 flex-col justify-center items-center'>
          <Key size={30}/>

<h2 className="text-2xl " >Reset password</h2>
<small>no worries! we are here!</small>

          </div>
          <TRForm  onSubmit={handleSendPassword}>
           <div className='space-y-3'>
           <TRInput label='Password' name='password' size='sm' type='password' />
            <TRInput label='Confirm Password' name='confirm-password' size='sm' type='password' />
           
            <Button fullWidth type='submit'  className="my-4" size='sm'>Reset pasword</Button>
        
           </div>
          </TRForm>

          <Link href={"/login"}><ArrowLeft/>Back to login in</Link>
          </div>
    );
};

export default ResetPassword;