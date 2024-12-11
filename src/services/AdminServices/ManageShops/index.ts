
"use server"
import axiosInstance from "@/lib/AxiosInstance";


export const getAllShopsForAdmin = async (query:Record<any,any>) => {
  const fetchOptions = {
    next: {
      tags: ["shops"],
    },
  };
  const queryString = new URLSearchParams(query).toString()

   const res = await axiosInstance.get(`/vendorShop?${queryString}`);


  if (!res) {
    throw new Error('Failed to fetch posts');
  }
 
  return res.data;
};