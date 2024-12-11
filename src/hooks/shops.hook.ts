
import { getAllShopsForAdmin } from "@/services/AdminServices/ManageShops";
import { useMutation } from "@tanstack/react-query";



export const useGetAllShops = () => {
    return useMutation({
      mutationKey: ['shops'],
      mutationFn: async (query: Record<string, any>) => {
        return await getAllShopsForAdmin(query);
      },
    });
  };