import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface TweetFormValues {
  content: string;
  images: string[];
  replyToId?: number;
}

export const useCreateTweet = () => {
  return useMutation({
    mutationFn: async (values: TweetFormValues) => {
   
      return await axiosInstance.post("/api/tweet", values);
    },
  });
};
