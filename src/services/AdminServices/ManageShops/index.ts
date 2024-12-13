
"use server"
import { revalidateTag } from "next/cache";

import nexiosInstance from "@/config/naxios.config";
import axiosInstance from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";


export const getAllShopsForAdmin = async (query:Record<any,any>) => {
  
  const queryString = new URLSearchParams(query).toString()

   const res = await nexiosInstance.get(`/vendorShop?${queryString}`, {
    next: { tags: ["shops"] }, // Enable caching with a specific tag
  });

  if (!res) {
    throw new Error('Failed to fetch posts');
  }
 
  return res.data;
};

export const getAllShopsForVendor = async (query:Record<any,any>) => {
  
  const queryString = new URLSearchParams(query).toString()

   const res = await nexiosInstance.get(`/vendorShop/vendor-shops?${queryString}`, {
    next: { tags: ["shops"] }, // Enable caching with a specific tag
  });

  if (!res) {
    throw new Error('Failed to fetch posts');
  }
 
  return res.data;
};




export const blacklistAShop = async (id: string) => {
  const res = await nexiosInstance.delete(`/vendorShop/blacklist/${id}`);

  // Revalidate the cache for the "shops" tag
  revalidateTag("shops");

  return res.data;
};




export const updateVendorShop = async (id:any,formData: FieldValues) => {
      
  try{
           
  const res = await axiosInstance.patch(`/vendorShop/update/${id}`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); 

  
  
  // Revalidate the cache for the "categories" tag
  revalidateTag("shops");

  return res.data;
  }catch(error:any){throw new Error(error)}
};




export const createVendorShop = async (data: FieldValues) => {
      
  try{
     
   
  const res = await axiosInstance.post('/vendorShop/create', data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

  
  
  // Revalidate the cache for the "shops" tag
  revalidateTag("shops");

  return res.data;
  }catch(error:any){throw new Error(error)}
};



export const addProduct = async (data: FieldValues) => {
      
  try{
     
   
   
  const res = await axiosInstance.post('/product/create-product', data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

  
  
  // Revalidate the cache for the "products" tag
  revalidateTag("shops");

  return res.data;
  }catch(error:any){throw new Error(error)}
};
