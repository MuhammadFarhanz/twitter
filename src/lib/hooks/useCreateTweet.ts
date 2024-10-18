import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: any) => {
      return await axiosInstance.post("/api/tweet", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
