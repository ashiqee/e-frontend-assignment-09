
import { getAllUsersForAdmin } from "@/services/AdminServices/ManageUser";
import { useMutation } from "@tanstack/react-query";



export const useGetAllUsers = () => {
    return useMutation({
      mutationKey: ['users'],
      mutationFn: async (query: Record<string, any>) => {
        return await getAllUsersForAdmin(query);
      },
    });
  };