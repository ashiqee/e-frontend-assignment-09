"use server"
import nexiosInstance from "@/config/naxios.config";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";





export const addReview = async (data: any) => {
      
    try{
       
     console.log(data);
     
    const res = await nexiosInstance.post('/review/create', data);
  
    revalidateTag("products");
  
    return res.data;
    }catch(error:any){throw new Error(error)}
  };
  