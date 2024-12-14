import { addToCart, deletAProductFromCart, getAllUserCartsItems } from "@/services/CartsServices";
import { createOrder } from "@/services/OrderServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";



export const useCreateOrder = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['orders'], // Using 'orders' as the mutation key
      mutationFn: async (formData: FieldValues) => {
        return await createOrder(formData); // Call your addToCart API function
      },
      onSuccess: () => {
        toast.success("Order created successfully");
        queryClient.invalidateQueries({ queryKey: ['orders'] }); // Invalidate the 'carts' cache to trigger a refetch
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to create order');
      },
    });
  };




  // export const useGetCartsItems = () => {
  //   return useQuery({
  //     queryKey: ['carts'], // Include query parameters in the key
  //     queryFn: () => getAllUserCartsItems(),
  //     staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  //   });
  // };



  // export const useDeleteCartItem = () => {
  //   const queryClient = useQueryClient();
  
  //   return useMutation({
  //     mutationKey: ['carts'],
  //     mutationFn: async (id: string) => {
  //       return await deletAProductFromCart(id);
  //     },
  //     onSuccess: () => {
  //       toast.success("carts deleted successfully");
  //       queryClient.invalidateQueries({ queryKey: ['carts'] }); // Invalidate the 'users' cache
  //     },
  //   });
  // };

