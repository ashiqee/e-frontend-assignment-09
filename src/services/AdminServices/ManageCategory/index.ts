"use server"
import nexiosInstance from "@/config/naxios.config";
import { revalidateTag } from "next/cache";



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