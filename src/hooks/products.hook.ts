import { useQuery } from "@tanstack/react-query";

import { getAllProductsForVendor } from "@/services/ProductsServices";




export const useGetAllProductsMyShops = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['products', query], // Include query parameters in the key
      queryFn: () => getAllProductsForVendor(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };