import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CustomIcon } from "../ui/custom-icon";
import Link from "next/link";
import { useGetUser } from "@/api/useGetUser";
import { useLikeTweet } from "@/api/useLikeTweet";
import { useRetweet } from "@/api/useRetweet";
import ReplyDialog from "./reply-dialog";
import { useGetTweetById } from "@/api/useGetTweetById";
import { useRouter } from "next/router";
import { AvatarProfile } from "./ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import FollowButton from "../user/follow-button";
import UserHoverCard from "./user-hover-card";
import { useBookmarkTweet } from "@/api/useBookmarkTweet";

type TweetCardProps = {
  data: {
    content: string;
    images: any;
    id: number;
    likes: any;
    retweetBy: any;
    likedBy: any;
    _count: {
      likes: number;
      retweetBy: number;
      replies: number;
      likedBy: number;
    };
    author: {
      id: number;
      username: string;
      name: string;
      bio: string;
      profile_pic: string;
    };
  };
};

function TweetCard({ data, isRelate, isRetweet }: any, { children }: any) {
  const { content, images, id, likedBy, retweetedBy, author, _count } = data;
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [tweetId, setTweetId] = useState(0);
  const router = useRouter();

  const { mutateAsync: likeTweet, status: likeStatus } = useLikeTweet();
  const { mutateAsync: bookmarkTweet } = useBookmarkTweet();
  const { mutateAsync: retweet } = useRetweet();
  const { data: user } = useGetUser();
  // const {id} = useGetTweetById()

  // console.log(data);
  // console.log(retweetedBy);
  // console.log(isLiked);
  console.log(likedBy, "s");
  useEffect(() => {
    if (user) {
      const hasUserLiked = likedBy?.some((like: any) => like.userId == user.id);
      const hasUserRetweeted = retweetedBy?.some(
        (rt: any) => rt.userId === user.id
      );
      setIsLiked(hasUserLiked);
      setIsRetweeted(hasUserRetweeted);
    }
  }, [user, likedBy, retweetedBy]);

  const svg = [
    {
      iconName: "ReplyIcon",
      fillColor: "group-hover:fill-accent-blue",
      textColor: "group-hover:text-accent-blue",
      bgColor: "hover:bg-accent-blue/30",
      totalAmount: _count?.replies !== 0 ? _count?.replies : "",
      onClick: (e: any) => handleReplyClick(e, id),
    },
    {
      iconName: "RepostIcon",
      fillColor: isRetweeted
        ? "fill-accent-green"
        : "group-hover:fill-accent-green",
      textColor: isRetweeted
        ? "text-accent-green"
        : "group-hover:text-accent-green",
      bgColor: "hover:bg-accent-green/30",
      totalAmount: _count?.retweetedBy !== 0 ? _count?.retweetedBy : "",
      onClick: (e: any) => handleRetweet(e, id),
    },
    {
      iconName: isLiked ? "SolidLikeIcon" : "LikeIcon",
      fillColor: "group-hover:fill-accent-pink",
      bgColor: "hover:bg-accent-pink/30",
      textColor: isLiked
        ? "group-hover:text-accent-pink text-accent-pink"
        : "group-hover:text-accent-pink",
      totalAmount: _count?.likedBy !== 0 ? _count?.likedBy : "",
      onClick: (e: any) => handleLikeClick(e, id),
    },
    {
      iconName: "ViewIcon",
      fillColor: "group-hover:fill-accent-blue",
      textColor: "group-hover:text-accent-blue",
      totalAmount: "",
    },
  ];

  const handleReplyClick = async (e: any, tweetId: number) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(tweetId);
    setTweetId(tweetId);
    // const { data } = useGetTweetById(tweetId);

    // console.log(data,'wkowk')
    setIsOpen(!isOpen);
  };

  // console.log(_count.likedBy);
  const handleLikeClick = useCallback(
    async (e: any, tweetId: number) => {
      e.preventDefault();
      e.stopPropagation();

      await likeTweet(tweetId);
      setIsLiked((prevIsLiked) => !prevIsLiked);
      _count.likedBy = isLiked ? _count?.likedBy - 1 : _count?.likedBy + 1;
    },
    [likeTweet, _count?.likedBy, isLiked]
  );

  const handleRetweet = useCallback(
    async (e: any, tweetId: number) => {
      e.preventDefault();
      e.stopPropagation();

      await retweet(tweetId);

      setIsRetweeted((prevIsRetweeted) => !prevIsRetweeted);
      _count.retweetedBy = isRetweeted
        ? _count?.retweetedBy - 1
        : _count?.retweetedBy + 1;
    },
    [retweet, _count?.retweetedBy, isRetweeted]
  );

  const handleBookmark = async (e: any, tweetId: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(tweetId, "bjirr");

    await bookmarkTweet(tweetId);
  };

  const imageGridStyles: any = {
    1: "grid-rows-1",
    2: "grid grid-cols-2 grid-rows-1 gap-[2px]",
    3: "w-full h-80",
    4: "grid grid-cols-2 gap-[2px]",
  };

  const renderImages = () => {
    if (images?.length === 3) {
      return (
        <div className={`grid grid-cols-2 gap-[2px]`}>
          <div className="col-span-1">
            <img
              className={`h-80 w-full object-cover`}
              src={images[0]?.url}
              alt={`Image 1`}
            />
          </div>
          <div className="col-span-1 grid grid-rows-2 h-full gap-[2px]">
            {images.slice(1, 3).map((subImage: any, subIndex: any) => (
              <div key={subIndex} className="row-span-1">
                <img
                  className={` w-full object-cover h-[160px]`}
                  src={subImage?.url}
                  alt={`Image ${subIndex + 2}`}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return images?.map((image: any, index: any) => (
      <img
        key={index}
        className={`w-full object-cover`}
        src={image?.url}
        alt={`Image ${index + 1}`}
      />
    ));
  };

  const handleAuthorClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate programmatically if needed
    router.push(`/${author.username}`);
  };

  return (
    <>
      <ReplyDialog isOpen={isOpen} setIsOpen={setIsOpen} id={tweetId} />
      <Link
        href={`/tweet/${id}`}
        className={`cursor-pointer relative flex flex-col gap-y-4 px-4 py-2 hover:bg-light-primary/10 outline-none duration-200 ${
          !isRelate
            ? "border-b border-light-border dark:border-dark-border "
            : null
        }`}
      >
        {isRetweet && (
          <div className="flex flex-row ml-5">
            <CustomIcon
              iconName="RepostIcon"
              className={`h-5 w-5 fill-[#8f93a0] mr-2`}
            />
            <p className="text-xs font-semibold text-[#8f93a0]">You reposted</p>
          </div>
        )}
        <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 w-full ">
          <div className="flex flex-col items-center gap-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="group relative self-start text-light-primary dark:text-dark-primary">
                  <AvatarProfile src={author?.profile_pic} />
                </div>
              </HoverCardTrigger>
              <UserHoverCard author={author} />
            </HoverCard>

            {isRelate ? (
              <i className="hover-animation h-full w-0.5 bg-light-line-reply group-hover:bg-light-primary/10  dark:bg-dark-line-reply"></i>
            ) : null}
          </div>

          <div className="flex min-w-0 flex-col text-white">
            <div className="flex justify-between gap-2 text-light-secondary dark:text-dark-secondary">
              <div className="flex gap-1 truncate xs:overflow-visible xs:whitespace-normal">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div
                      onClick={handleAuthorClick}
                      className="flex items-center gap-1 truncate font-bold custom-underline text-light-primary dark:text-dark-primary"
                    >
                      {author?.name}
                      <CustomIcon
                        iconName="CheckmarkIcon"
                        className="fill-blue-400 h-5"
                      />
                    </div>
                  </HoverCardTrigger>
                  <UserHoverCard author={author} />
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div
                      className="truncate text-light-secondary dark:text-dark-secondary hover:text-red-400"
                      onClick={handleAuthorClick}
                    >
                      @{author?.username}
                    </div>
                  </HoverCardTrigger>
                  <UserHoverCard author={author} />
                </HoverCard>

                <div className="flex gap-1">
                  <i>·</i>
                  <div className="group relative text-[#8f93a0]">
                    <div className="custom-underline peer whitespace-nowrap">
                      2h
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <CustomIcon
                  iconName="MoreIcon"
                  className="w-5 h-5 fill-[#8f93a0]"
                />
              </div>
            </div>

            <div className="0 text-light-primary dark:text-dark-primary ">
              {content}
            </div>

            <div
              className={`items-center w-full mt-2 rounded-2xl overflow-hidden p-0 ${
                imageGridStyles[data?.images?.length] || ""
              }`}
            >
              {renderImages()}
            </div>

            <div className="h-8 bg flex flex-row mt-1 ">
              <div className="bg w-[85%] flex flex-row items-center">
                {svg.map(({ ...data }) => (
                  <button
                    key={data.iconName}
                    onClick={data.onClick}
                    className="w-1/4 flex flex-row items-end"
                  >
                    <div className="group flex flwx-row justify-center items-center">
                      <div
                        className={`flex ${data.bgColor} justify-center rounded-full p-1  `}
                      >
                        <CustomIcon
                          iconName={data.iconName as any}
                          className={`h-5 w-5 fill-[#8f93a0] ${data.fillColor}`}
                        />
                      </div>
                      <p
                        className={`text-xs text-[#8f93a0]  ${data.textColor}`}
                      >
                        {data.totalAmount}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="bg-yel0 w-[15%] flex flex-row items-center justify-center">
                <button onClick={(e: any) => handleBookmark(e, id)}>
                  <CustomIcon
                    iconName="BookmarkIcon"
                    className="h-5 w-5 fill-[#8f93a0] mr-4 hover:fill-accent-blue"
                  />
                </button>

                <CustomIcon
                  iconName="ShareIcon"
                  className="h-5 w-5 fill-[#8f93a0]"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {children}
    </>
  );
}

export default TweetCard;
