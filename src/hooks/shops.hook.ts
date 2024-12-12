
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { blacklistAShop, getAllShopsForAdmin, getAllShopsForVendor, updateVendorShop } from "@/services/AdminServices/ManageShops";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";





  export const useGetAllShops = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['shops', query], // Include query parameters in the key
      queryFn: () => getAllShopsForAdmin(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };


  export const useGetAllVendorMyShops = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['shops', query], // Include query parameters in the key
      queryFn: () => getAllShopsForVendor(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };
  


  export const useBlacklistShop = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['blacklistShop'],
      mutationFn: async (id: string) => {
        
        return await blacklistAShop(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['shops'] }); // Invalidate the 'users' cache
      },
    });
  };


  
  export const useUpdateVendorShop = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['shops'],
      mutationFn: async ({ id, formData }: { id: string; formData: FieldValues }) => {
              
        return await updateVendorShop(id, formData);
      },
      onSuccess: () => {
        toast.success('VendorShop updated successfully');
        queryClient.invalidateQueries({ queryKey: ['shops'] }); // Invalidate the cache
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to update VendorShop');
      },
    });
  }