import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
interface UserData {
  bio: string | null;
  id: number;
  name: string;
  profile_pic: string;
  username: string;
  _count: any;
  is_verified: boolean;
}

export const useGetUser = () => {
  return useQuery<UserData>({
    queryKey: ["getuser"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/users/current");
      return data.data;
    },
    staleTime: 120000,
  });
};
