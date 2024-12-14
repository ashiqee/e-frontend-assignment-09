import { addToCart, getAllUserCartsItems } from "@/services/CartsServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";



export const useAddToCart = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['carts'], // Using 'carts' as the mutation key
      mutationFn: async (formData: FieldValues) => {
        return await addToCart(formData); // Call your addToCart API function
      },
      onSuccess: () => {
       
        queryClient.invalidateQueries({ queryKey: ['carts'] }); // Invalidate the 'carts' cache to trigger a refetch
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to add product to cart');
      },
    });
  };




  export const useGetCartsItems = () => {
    return useQuery({
      queryKey: ['carts'], // Include query parameters in the key
      queryFn: () => getAllUserCartsItems(),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };