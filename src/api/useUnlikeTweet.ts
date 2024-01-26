import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUnlikeTweet = () => {
  return useMutation({
    mutationFn: async (tweetId: number) => {
      return await axiosInstance.post("/api/tweet/unlike", { tweetId });
    },
  });
};
