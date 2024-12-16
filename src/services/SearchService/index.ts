"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const searchItems = async (searchTerm: string) => {
  try {
    const {data} = await axiosInstance.get(`/product?searchTerm=${searchTerm}&limit=5`);



    return data.data.products;
  } catch (error) {
    throw new Error("Failed to search items");
  }
};
