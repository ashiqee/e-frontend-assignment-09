import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { createOrder, createPaymentforOrder, getAllUserOrdersHistory, getAllUserOrdersHistoryForAdmin } from "@/services/OrderServices";



export const useCreateOrder = () => {
  const router = useRouter()
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['orders'], // Using 'orders' as the mutation key
      mutationFn: async (formData: FieldValues) => {
        return await createOrder(formData); // Call your addToCart API function
      },
      onSuccess: () => {
        toast.success("Order created successfully");
       
        queryClient.invalidateQueries({ queryKey: ['orders'] }); // Invalidate the 'carts' cache to trigger a refetch
        queryClient.invalidateQueries({ queryKey: ['carts'] }); 
        router.push('/order-success')
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to create order');
      },
    });
  };


export const useCreateOrderWithPayment = () => {
  const router = useRouter()
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['orders'],
      mutationFn: async (formData: FieldValues) => {
        const res = await createPaymentforOrder(formData); 
         
        console.log(res.data);
        if (res.success) {
  
          toast.success(res.message);
          
          router.push(res.data.payment_url)
          
        queryClient.invalidateQueries({ queryKey: ['orders'] }); 
        queryClient.invalidateQueries({ queryKey: ['carts'] }); 
        }
        return res;
      },
      onSuccess: () => {
       
       
       
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to create order');
      },
    });
  };




  export const useGetUserOrderHistory = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['orders',query], // Include query parameters in the key
      queryFn: () => getAllUserOrdersHistory(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };

  export const useGetAllUserOrderHistoryForAdmin = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['orders',query], // Include query parameters in the key
      queryFn: () => getAllUserOrdersHistoryForAdmin(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };



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

