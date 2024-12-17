import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {   deletACoupon, getAllCoupon } from "@/services/AdminServices/ManageCoupon";




export const useGetAllCoupons = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['coupons', query], // Include query parameters in the key
      queryFn: () => getAllCoupon(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };




  export const useDeleteCoupon = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['coupons'],
      mutationFn: async (id: string) => {
        return await deletACoupon(id);
      },
      onSuccess: () => {
        toast.success("Coupon deleted successfully");
        queryClient.invalidateQueries({ queryKey: ['coupons'] }); // Invalidate the 'users' cache
      },
    });
  };




