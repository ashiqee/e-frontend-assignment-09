import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import { addProduct, deletAProduct, getAllProductsForPublic, getAllProductsForVendor, getProductDetailsForPublic, updateProduct } from "@/services/ProductsServices";



export const useGetAllProductsForPublic = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['products', query], // Include query parameters in the key
      queryFn: () => getAllProductsForPublic(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };


export const useGetProductDetailsForPublic = (id:string) => {
    return useQuery({
      queryKey: ['products', id], // Include id parameters in the key
      queryFn: () => getProductDetailsForPublic(id),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };




export const useGetAllProductsMyShops = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['products', query], // Include query parameters in the key
      queryFn: () => getAllProductsForVendor(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };



  

  // product related api 


  export const useAddProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['products'],
      mutationFn: async (data:FieldValues) => {
        return await addProduct(data);
      },
      onSuccess: () => {
        toast.success("Product added successfully");
        queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate the 'categories' cache
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to created add product');
      },
    });
  };

  export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['products'],
      mutationFn: async ({ id, formData }: { id: string; formData: FieldValues }) => {
              
        return await updateProduct(id, formData);
      },
      onSuccess: () => {
        toast.success('Product updated successfully');
        queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate the cache
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to update Product');
      },
    });
  }


// Delete product 
  export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['categories'],
      mutationFn: async (id: string) => {
        return await deletAProduct(id);
      },
      onSuccess: () => {
        toast.success("Product deleted successfully");
        queryClient.invalidateQueries({ queryKey: ['products'] }); // Invalidate the 'users' cache
      },
    });
  };