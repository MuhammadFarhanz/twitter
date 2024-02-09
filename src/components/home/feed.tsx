import { useGetTweet } from "@/api/useGetTweet";
import TweetCard from "../tweet/tweet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CustomIcon } from "../ui/custom-icon";
import ImageInput, { svg } from "../tweet/input/image-input";
import useTweetFormLogic from "../tweet/service/useTweetForm";
import TextareaInput from "../tweet/input/textarea-input";
import ImageComponent from "../tweet/ui/image-preview";
import { ChangeEvent, useRef } from "react";
import { AvatarProfile } from "../tweet/ui/avatar";
import { TweetFormFeed } from "./tweet-form-feed";
import FeedHeader from "./feed-header";
import FeedWrapper from "./feed-wrapper";

export function Feed(): JSX.Element {
  const { data } = useGetTweet();
  const { formik, handleFileInputChange } = useTweetFormLogic({});

  return (
    <FeedWrapper>
      <FeedHeader />
      <TweetFormFeed
        formik={formik}
        handleFileInputChange={handleFileInputChange}
      />

      {data?.data.map((tweetData: any) => (
        <TweetCard key={tweetData.id} data={tweetData} />
      ))}
    </FeedWrapper>
  );
}
