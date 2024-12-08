import { FieldValues } from "react-hook-form"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { loginUser, registerUser } from "@/services/AuthService";








export const useUserRegistration =()=>{
    return useMutation<any,Error,FieldValues>({
        mutationKey: ['USER_REGISTRATION'],
        mutationFn: async (userData)=> await registerUser(userData),
        onSuccess:(res)=>{
                     
            toast.success(res.message);
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
};


export const useUserLogin = ()=>{
    return useMutation<any,Error,FieldValues>({
        mutationKey:["USER_LOGIN"],
        mutationFn: async (userData)=> await loginUser(userData),
        onSuccess:(res)=>{
            if (res.success) {
                toast.success(res.message);
               
              } else {
                toast.error(res.message); 
                throw new Error(res.message); 
              }
        },
        onError:(error)=>{
            toast.error(error.message)
        },
    });
};