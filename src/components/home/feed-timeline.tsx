import { useGetTimeline } from "@/api/useGetTimeline";
import React, { useEffect } from "react";
import TweetCard from "../tweet/tweet-card";
import Spinner from "../ui/spinner";
import { useInView } from "react-intersection-observer";

function Timeline() {
  const { ref, inView } = useInView();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, isLoading } =
    useGetTimeline();

  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  return (
    <>
      {data?.pages?.map((page) =>
        page?.data?.map((tweetData: any, index: number) => {
          // if the last element in the page is in view, add a ref to it
          if (page.data.length === index + 1) {
            return (
              <>
                <TweetCard key={tweetData.id} data={tweetData} />
                <div ref={ref} key={index} className="h-2"></div>
              </>
            );
          } else {
            return <TweetCard key={tweetData.id} data={tweetData} />;
          }
        })
      )}
      {(isLoading || isFetchingNextPage) && <Spinner />}
    </>
  );
}

export default Timeline;
