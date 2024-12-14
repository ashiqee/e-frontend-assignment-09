import { addToCart, getAllUserCartsItems } from "@/services/CartsServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";



export const useAddToCart = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['carts'],
      mutationFn: async (formData:FieldValues) => {
        return await addToCart(formData);
      },
      onSuccess: () => {
        toast.success("Product added in cart successfully");
        queryClient.invalidateQueries({ queryKey: ['carts'] }); // Invalidate the 'categories' cache
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to created add cart');
      },
    });
  };



  
export const useGetCartsItems = () => {
    return useQuery({
      queryKey: ['products'], // Include id parameters in the key
      queryFn: () => getAllUserCartsItems(),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };

