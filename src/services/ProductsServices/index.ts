"use server"
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

import nexiosInstance from "@/config/naxios.config";
import axiosInstance from "@/lib/AxiosInstance";







// products api 

export const addProduct = async (data: FieldValues) => {
      
        try{
           
         
        const res = await axiosInstance.post('/product/create-product', data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
      
        
        
        // Revalidate the cache for the "products" tag
        revalidateTag("products");
      
        return res.data;
        }catch(error:any){throw new Error(error)}
      };
      
   
      export const deletAProduct = async (id: string) => {
        const res = await nexiosInstance.delete(`/product/delete/${id}`);
       
        // Revalidate the cache for the "categories" tag
        revalidateTag("products");
      
        return res.data;
      };
    







export const getAllProductsForPublic = async (query:Record<any,any>) => {
  
        const queryString = new URLSearchParams(query).toString()
      
        const res = await axiosInstance.get(`/product?${queryString}`);
      
        if (!res) {
          throw new Error('Failed to fetch posts');
        }
       
        return res.data;
      };


export const getProductDetailsForPublic = async (id:string) => {
  
      
         const res = await axiosInstance.get(`/product/${id}`);
      
        if (!res) {
          throw new Error('Failed to fetch posts');
        }
       
        return res.data;
      };



      
export const getAllProductsForVendor = async (query:Record<any,any>) => {
  
        const queryString = new URLSearchParams(query).toString()
      
         const res = await axiosInstance.get(`/product/vendor?${queryString}`);
      
        if (!res) {
          throw new Error('Failed to fetch posts');
        }
       
        
        return res.data;
      };
      



      export const updateProduct = async (id:any,formData: FieldValues) => {
      
        try{
                 
        const res = await axiosInstance.patch(`/product/update/${id}`, formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }); 
       
        
        // Revalidate the cache for the "shops" tag
        revalidateTag("products");
      
        return res.data;
        }catch(error:any){throw new Error(error)}
      };
      

      export const updateFlashSaleStatus = async (payload:any,id:any) => {
        try {
          const res = await axiosInstance.put(`/product/flashSale/${id}`,payload);
     
          // Check for successful response (status code 2xx)
          if (res.status < 200 || res.status >= 300) {
            throw new Error(`Failed to fetch carts, status: ${res.status}`);
          }
     
       
          return res.data;
     
        } catch (error) {
          console.error("Error fetching cart items:", error);
          throw new Error('Failed to fetch carts');
        }
     };
    