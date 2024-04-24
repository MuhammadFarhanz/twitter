import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBookmark = () => {
  return useQuery({
    queryKey: ["getbookmark"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/users/bookmark");
      return data.data;
    },
  });
};
