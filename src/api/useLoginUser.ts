import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface Values {
  email: string;
  password: string;
}

export const useLoginUser = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: async (body: Values) => {
      return await axiosInstance.post("/api/users/login", body);
    },
    onSuccess,
  });
};
