
import { useQuery } from "@tanstack/react-query";

import { getAllShopsForAdmin } from "@/services/AdminServices/ManageShops";





  export const useGetAllShops = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['shops', query], // Include query parameters in the key
      queryFn: () => getAllShopsForAdmin(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };
  