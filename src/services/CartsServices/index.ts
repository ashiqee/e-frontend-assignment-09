"use server"
import axiosInstance from "@/lib/AxiosInstance";
import nexiosInstance from "nexios-http";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";
import { getCurrentUser } from "../AuthService";



export const addToCart = async (formData: FieldValues) => {
    try {
      const res = await axiosInstance.post('/carts/addTocart', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      revalidateTag("carts");
      return res.data;
    } catch (error: any) {
      console.error("AxiosError:", error.response?.data || error.message);
      throw new Error(error);
    }
  };
  

  export const getAllUserCartsItems = async () => {
    try {

      const user = await getCurrentUser();
  
      if (user?.role !== 'CUSTOMER') {
        throw new Error('Unauthorized: Only customers can view cart items');
      }
  
      const res = await axiosInstance.get('/carts');
  
   
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Failed to fetch carts, status: ${res.status}`);
      }
  
      return res.data;
  
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw new Error('Failed to fetch carts');
    }
  };




  export const deletAProductFromCart = async (id: any) => {
    
    
    const res = await axiosInstance.delete(`/carts/delete/${id}`);
   
    // Revalidate the cache for the "carts" tag
    revalidateTag("carts");
  
    return res.data;
  };

