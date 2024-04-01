// import axiosInstance from "@/lib/axios";
// import { useMutation, useQuery } from "@tanstack/react-query";

// export const useGetReplies = (authorId: any) => {
//   return useQuery({
//     queryKey: ["getreplies", authorId],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get(
//         `/api/tweets/replies/${authorId}`
//       );

//       return data.data;
//     },
//     enabled: !!authorId,
//   });
// };
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetReplies = (authorId: any) => {
  return useQuery({
    queryKey: ["getreplies", authorId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/api/tweet/replies/${authorId}`
      );

      return data.data;
    },
    enabled: !!authorId,
  });
};
