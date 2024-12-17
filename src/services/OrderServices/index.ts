"use server"
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/lib/AxiosInstance";
import nexiosInstance from "@/config/naxios.config";



export const createOrder = async (formData: FieldValues) => {
    try {
      
      
      const res = await axiosInstance.post('/orders/create', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      revalidateTag("orders");
      
      return res.data;
    } catch (error: any) {
      console.error("AxiosError:", error.response?.data || error.message);
      throw new Error(error);
    }
  };



  export const createPaymentforOrder = async (formData: FieldValues) => {
    try {
   
      
      const res = await axiosInstance.post("/orders/createPayOrder", formData);
  

  
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  };




  export const getAllUserOrdersHistory = async () => {
    try {
      const res = await axiosInstance.get('/orders/getUserOrders');
 
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


  export const updateOrderItemStatus = async (payload:any,orderItemId:any) => {
    try {
      const res = await axiosInstance.put(`/orders/statusChange/${orderItemId}`,payload);
 
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




//   export const deletAProductFromCart = async (id: any) => {
    
    
//     const res = await axiosInstance.delete(`/carts/delete/${id}`);
   
//     // Revalidate the cache for the "carts" tag
//     revalidateTag("carts");
  
//     return res.data;
//   };

