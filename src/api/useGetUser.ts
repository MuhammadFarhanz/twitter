import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["getuser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/users/current");

      return response.data;
    },
  });
};
