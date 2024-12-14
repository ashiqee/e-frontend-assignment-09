"use server"
import nexiosInstance from "@/config/naxios.config";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";







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
      
         const res = await nexiosInstance.get(`/product?${queryString}`, {
          next: { tags: ["products"] }, // Enable caching with a specific tag
        });
      
        if (!res) {
          throw new Error('Failed to fetch posts');
        }
       
        return res.data;
      };


export const getProductDetailsForPublic = async (id:string) => {
  
      
         const res = await nexiosInstance.get(`/product/${id}`, {
          next: { tags: ["products"] }, // Enable caching with a specific tag
        });
      
        if (!res) {
          throw new Error('Failed to fetch posts');
        }
       
        return res.data;
      };



      
export const getAllProductsForVendor = async (query:Record<any,any>) => {
  
        const queryString = new URLSearchParams(query).toString()
      
         const res = await nexiosInstance.get(`/product/vendor?${queryString}`, {
          next: { tags: ["products"] }, // Enable caching with a specific tag
        });
      
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
      