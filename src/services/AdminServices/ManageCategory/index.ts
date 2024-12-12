"use server"
import nexiosInstance from "@/config/naxios.config";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { Jockey_One } from "next/font/google";
import { FieldValues } from "react-hook-form";



export const getAllCaterory = async (query: Record<string, any>) => {
    const queryString = new URLSearchParams(query).toString();
    
    const res = await nexiosInstance.get(`/category?${queryString}`, {
      next: { tags: ["categories"] }, // Enable caching with a specific tag
    });
  
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