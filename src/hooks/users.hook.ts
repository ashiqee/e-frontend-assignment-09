import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { deletAUser, getAllUsersForAdmin, suspendAUser } from '@/services/AdminServices/ManageUser';


export const useGetAllUsers = (query: Record<string, any>) => {
  return useQuery({
    queryKey: ['users', query], // Include query parameters in the key
    queryFn: () => getAllUsersForAdmin(query),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: async (id: string) => {
      return await deletAUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // Invalidate the 'users' cache
    },
  });
};

export const useSuspendUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['suspendUser'],
    mutationFn: async (id: string) => {
      
      return await suspendAUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // Invalidate the 'users' cache
    },
  });
};
