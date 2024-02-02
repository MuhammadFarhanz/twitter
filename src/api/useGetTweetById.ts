import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTweetById = (id: any) => {
  return useQuery({
    queryKey: ["gettweet", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/tweet/${id}`);

      return response.data.data;
    },
    enabled: !!id,
  });
};
