import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useBookmarkTweet = () => {
  return useMutation({
    mutationFn: async (tweetId: number) => {
      return await axiosInstance.post("/api/users/bookmark", { tweetId });
    },
  });
};
