import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFollowUser = (id: any) => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`/api/users/follow/${id}`);

      return response.data.data;
    },
  });
};
