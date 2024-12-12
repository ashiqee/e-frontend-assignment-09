"use server";

import { revalidateTag } from "next/cache";

import nexiosInstance from "@/config/naxios.config";

// Fetch all users for admin with server-side caching
export const getAllUsersForAdmin = async (query: Record<string, any>) => {
  const queryString = new URLSearchParams(query).toString();
  
  const res = await nexiosInstance.get(`/users?${queryString}`, {
    next: { tags: ["users"] }, // Enable caching with a specific tag
  });

  if (!res) {
    throw new Error("Failed to fetch users");
  }

  return res.data;
};

// Delete a user and revalidate cache
export const deletAUser = async (id: string) => {
  const res = await nexiosInstance.delete(`/users/delete/${id}`);



  // Revalidate the cache for the "users" tag
  revalidateTag("users");

  return res.data;
};


export const suspendAUser = async (id: string) => {
  const res = await nexiosInstance.delete(`/users/suspend/${id}`);

  // Revalidate the cache for the "users" tag
  revalidateTag("users");

  return res.data;
};
