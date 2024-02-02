import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useRetweet = () => {
  return useMutation({
    mutationFn: async (tweetId: number) => {
      return await axiosInstance.post("/api/tweet/retweet", { tweetId });
    },
  });
};
