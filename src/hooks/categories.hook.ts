import { deletACategory, getAllCaterory } from "@/services/AdminServices/ManageCategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




export const useGetAllCategories = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['categories', query], // Include query parameters in the key
      queryFn: () => getAllCaterory(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };
  

  export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['categories'],
      mutationFn: async (id: string) => {
        return await deletACategory(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] }); // Invalidate the 'users' cache
      },
    });
  };