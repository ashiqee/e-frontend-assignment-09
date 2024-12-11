
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { blacklistAShop, getAllShopsForAdmin } from "@/services/AdminServices/ManageShops";





  export const useGetAllShops = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['shops', query], // Include query parameters in the key
      queryFn: () => getAllShopsForAdmin(query),
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