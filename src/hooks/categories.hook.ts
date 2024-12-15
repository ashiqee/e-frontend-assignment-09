import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { createCategory, deletACategory, getAllCaterory, getAllPublicCaterory, updateCategory } from "@/services/AdminServices/ManageCategory";




export const useGetAllCategories = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['categories', query], // Include query parameters in the key
      queryFn: () => getAllCaterory(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };


export const useGetAllCategoriesForPublic = () => {
    return useQuery({
      queryKey: ['categories'], // Include query parameters in the key
      queryFn: () => getAllPublicCaterory(),
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
        toast.success("Category deleted successfully");
        queryClient.invalidateQueries({ queryKey: ['categories'] }); // Invalidate the 'users' cache
      },
    });
  };


  export const useCreateCategory = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['categories'],
      mutationFn: async (data:FieldValues) => {
        return await createCategory(data);
      },
      onSuccess: () => {
        toast.success("Category created successfully");
        queryClient.invalidateQueries({ queryKey: ['categories'] }); // Invalidate the 'categories' cache
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to created category');
      },
    });
  };



  export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['categories'],
      mutationFn: async ({ id, formData }: { id: string; formData: FieldValues }) => {
              
        return await updateCategory(id, formData);
      },
      onSuccess: () => {
        toast.success('Category updated successfully');
        queryClient.invalidateQueries({ queryKey: ['categories'] }); // Invalidate the cache
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to update category');
      },
    });
  };