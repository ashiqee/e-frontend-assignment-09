"use server"
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/lib/AxiosInstance";
import nexiosInstance from "@/config/naxios.config";



export const getAllCaterory = async (query: Record<string, any>) => {
    const queryString = new URLSearchParams(query).toString();
    
    const res = await axiosInstance.get(`/category?${queryString}`);
  
    if (!res) {
      throw new Error("Failed to fetch users");
    }
  
    return res.data;
  };

export const getAllPublicCaterory = async () => {
   
    const res = await axiosInstance.get(`/category/all`);
  
    if (!res) {
      throw new Error("Failed to fetch users");
    }

    return res.data;
  };


  export const deletACategory = async (id: string) => {
    const res = await nexiosInstance.delete(`/category/delete/${id}`);
   
    // Revalidate the cache for the "categories" tag
    revalidateTag("categories");
  
    return res.data;
  };



  export const createCategory = async (data: FieldValues) => {
      
    try{
       
        
    const res = await axiosInstance.post('/category/create', data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
    
    
    // Revalidate the cache for the "categories" tag
    revalidateTag("categories");
  
    return res.data;
    }catch(error:any){throw new Error(error)}
  };


  export const updateCategory = async (id:any,formData: FieldValues) => {
      
    try{
             
    const res = await axiosInstance.patch(`/category/update/${id}`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }); 
  
    
    
    // Revalidate the cache for the "categories" tag
    revalidateTag("categories");
  
    return res.data;
    }catch(error:any){throw new Error(error)}
  };