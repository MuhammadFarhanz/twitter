import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await axiosInstance.post("/api/users", body);

      return response;
    },
  });
};
