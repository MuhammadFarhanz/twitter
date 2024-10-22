import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      return await axiosInstance.patch("/api/users/current", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess,
  });
};
