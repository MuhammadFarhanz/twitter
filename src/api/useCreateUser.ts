import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
interface Values {
  username: string;
  email: string;
  password: string;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (body: Values) => {
      return await axiosInstance.post("/api/users", body);
    },
  });
};
