import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUserByUsername = (username: any) => {
  return useQuery({
    queryKey: ["getuser", username],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/users/${username}`);

      return data.data;
    },
    enabled: !!username,
    staleTime: 120000,
  });
};
