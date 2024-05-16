import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TweetFormValues {
  content: string;
  images: string[];
  replyToId?: number;
}

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: TweetFormValues) => {
      return await axiosInstance.post("/api/tweet", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
