
"use server"
import { revalidateTag } from "next/cache";

import nexiosInstance from "@/config/naxios.config";


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




export const blacklistAShop = async (id: string) => {
  const res = await nexiosInstance.delete(`/vendorShop/blacklist/${id}`);

  // Revalidate the cache for the "shops" tag
  revalidateTag("shops");

  return res.data;
};