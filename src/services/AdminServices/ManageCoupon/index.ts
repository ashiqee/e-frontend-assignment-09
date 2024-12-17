"use server"
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/lib/AxiosInstance";
import nexiosInstance from "@/config/naxios.config";



export const getAllCoupon = async (query: Record<string, any>) => {
    const queryString = new URLSearchParams(query).toString();
    
    const res = await axiosInstance.get(`/coupons?${queryString}`);
  
    if (!res) {
      throw new Error("Failed to fetch coupon");
    }

  
    return res.data;
  };



  export const deletACoupon = async (id: string) => {
    const res = await nexiosInstance.delete(`/coupons/delete/${id}`);
   
    // Revalidate the cache for the "coupons" tag
    revalidateTag("coupons");
  
    return res.data;
  };



  export const createcoupons = async (data: FieldValues) => {
      
    try{
       
        
    const res = await nexiosInstance.post('/coupons/create', data)
       

    // Revalidate the cache for the "coupons" tag
    revalidateTag("coupons");
  
    return res.data;
    }catch(error:any){throw new Error(error)}
  };


  export const updatecoupons = async (id:any,formData: FieldValues) => {
      
    try{
             
    const res = await nexiosInstance.put(`/coupons/update/${id}`, formData)
 
    
    // Revalidate the cache for the "coupons" tag
    revalidateTag("coupons");
  
    return res.data;
    }catch(error:any){throw new Error(error)}
  };