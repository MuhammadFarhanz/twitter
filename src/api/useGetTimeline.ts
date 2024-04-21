import axiosInstance from "@/lib/axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fetchPage = async ({ take, lastCursor }: any) => {
  const response = await axiosInstance.get("/api/tweet/timeline", {
    params: { take, lastCursor },
  });
  return response?.data?.data;
};

export const useGetTimeline = () => {
  return useInfiniteQuery({
    queryKey: ["data"],
    queryFn: ({ pageParam = "" }) =>
      fetchPage({ take: 10, lastCursor: pageParam }),
    initialPageParam: null,
    // getNextPageParam is used to get the cursor of the last element in the current page
    // which is then used as the pageParam in the queryFn
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData?.lastCursor;
    },
  });
};
