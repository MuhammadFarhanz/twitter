import React, { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CustomIcon } from "../ui/custom-icon";
import Link from "next/link";
import { useGetUser } from "@/api/useGetUser";
import { useLikeTweet } from "@/api/useLikeTweet";
import { useUnlikeTweet } from "@/api/useUnlikeTweet";

function TweetCard(data: any) {
  const { content, images, id, likes } = data.data;
  const [isLiked, setIsLiked] = useState(false);
  const { mutateAsync: likeTweet, status: likeStatus } = useLikeTweet();
  const {
    mutateAsync: unlikeTweet,
    status: unlikeStatus,
    isSuccess,
  } = useUnlikeTweet();

  const { data: user } = useGetUser();

  useEffect(() => {
    if (user && likes) {
      const hasUserLiked = likes.some(
        (like: any) => like.user.id === user.data.id
      );
      setIsLiked(hasUserLiked);
    }
  }, [user, likes]);

  const svg = [
    {
      iconName: "ReplyIcon",
      fillColor: "group-hover:fill-accent-blue",
      textColor: "group-hover:text-accent-blue",
      bgColor: "hover:bg-accent-blue/30",
      totalAmount: 96,
      onClick: (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        // Your logic for handling a reply click
        console.log("Reply clicked!");
      },
    },
    {
      iconName: "RepostIcon",
      fillColor: "group-hover:fill-accent-green",
      textColor: "group-hover:text-accent-green",
      bgColor: "hover:bg-accent-green/30",
      totalAmount: 23,
      onClick: (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        // Your logic for handling a repost click
        console.log("Repost clicked!");
      },
    },
    {
      iconName: isLiked ? "SolidLikeIcon" : "LikeIcon",
      fillColor: "group-hover:fill-accent-pink",
      bgColor: "hover:bg-accent-pink/30",
      textColor: isLiked
        ? "group-hover:text-accent-pink text-accent-pink"
        : "group-hover:text-accent-pink",
      totalAmount: data.data._count.likes,
      onClick: (e: any) => handleLikeClick(e, id),
    },
    {
      iconName: "ViewIcon",
      fillColor: "group-hover:fill-accent-blue",
      textColor: "group-hover:text-accent-blue",
      totalAmount: 23932,
    },
  ];

  const handleLikeClick = useCallback(
    async (e: any, tweetId: number) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLiked) {
        await unlikeTweet(tweetId);

        setIsLiked((prevIsLiked) => !prevIsLiked);
        data.data._count.likes -= 1;
      } else {
        await likeTweet(tweetId);

        setIsLiked((prevIsLiked) => !prevIsLiked);
        data.data._count.likes += 1;
      }
    },
    [isLiked, likeTweet, unlikeTweet, unlikeStatus, likeStatus, data]
  );

  const imageGridStyles: any = {
    1: "grid-rows-1",
    2: "grid grid-cols-2 grid-rows-1 gap-[2px]",
    3: "w-full h-80",
    4: "grid grid-cols-2 gap-[2px]",
  };

  return (
    <Link
      href={`/posts/${id}`}
      className="cursor-pointer relative flex flexcol gap-y-4 px-4 py-3  outline-none duration-200 border-b border-light-border dark:border-dark-border"
    >
      <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 ">
        <div className="flex flex-col items-center gap-2">
          <div className="group relative self-start text-light-primary dark:text-dark-primary [&>div]:translate-y-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex min-w-0 flex-col text-white">
          <div className="flex justify-between gap-2 text-light-secondary dark:text-dark-secondary">
            <div className="flex gap-1 truncate xs:overflow-visible xs:whitespace-normal">
              <div className="flex items-center gap-1 truncate font-bold custom-underline text-light-primary dark:text-dark-primary">
                username
              </div>
              <div className="truncate text-light-secondary dark:text-dark-secondary">
                @staynaughty
              </div>
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
          <div className="my-1 text-light-primary dark:text-dark-primary">
            {content}
          </div>

          <div
            className={`items-center w-full mt-2 rounded-2xl overflow-hidden p-0 ${
              imageGridStyles[data?.data?.images?.length] || ""
            }`}
          >
            {images.length !== 3 ? (
              images.map((image: any, index: any) => (
                <img
                  key={index}
                  className={`w-full object-cover`}
                  src={image?.url}
                  alt={`Image ${index + 1}`}
                />
              ))
            ) : (
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
            )}
          </div>

          <div className="h-8 bg flex flex-row mt-2">
            <div className="bg w-[85%] flex flex-row items-center">
              {svg.map(({ ...data }) => (
                <button
                  key={data.iconName}
                  onClick={data.onClick}
                  className=" bg w-1/4 flex flex-row items-end group"
                >
                  <div
                    className={`flex ${data.bgColor} justify-center rounded-full p-1`}
                  >
                    <CustomIcon
                      iconName={data.iconName as any}
                      className={`h-5 w-5 fill-[#8f93a0] ${data.fillColor}`}
                    />
                  </div>
                  <p
                    className={`text-xs mb-1 text-[#8f93a0]  ${data.textColor}`}
                  >
                    {data.totalAmount}
                  </p>
                </button>
              ))}
            </div>
            <div className="bg-yel0 w-[15%] flex flex-row items-center justify-center">
              <CustomIcon
                iconName="BookmarkIcon"
                className="h-5 w-5 fill-[#8f93a0] mr-4"
              />
              <CustomIcon
                iconName="ShareIcon"
                className="h-5 w-5 fill-[#8f93a0]"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TweetCard;
