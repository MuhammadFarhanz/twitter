import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTweet = () => {
  return useQuery({
    queryKey: ["gettweet"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/tweet");

      return response.data;
    },
  });
};
