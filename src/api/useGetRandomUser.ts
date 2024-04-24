import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetRandomUser = () => {
  return useQuery({
    queryKey: ["getrandomuser"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/users/random");
      return data?.data;
    },
    staleTime: Infinity,
  });
};
