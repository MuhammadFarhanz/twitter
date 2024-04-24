import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useLogoutUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.delete("/api/users/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("accent");
      localStorage.removeItem("theme");
      router.push("/auth/sign-in");
    },
  });
};
