import React, { useEffect, useState } from "react";
import { CustomIcon } from "../ui/custom-icon";
import Link from "next/link";
import { useGetUser } from "@/lib/hooks/useGetUser";
import ReplyDialog from "./reply-dialog";
import { useRouter } from "next/router";
import { AvatarProfile } from "./ui/avatar";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import UserHoverCard from "./user-hover-card";
import RenderImages from "./render-images";
import ImageDialog from "./images-dialog";
import IconButton from "./icon-button";
import TweetHeader from "./tweet-card-header";
import useTweetCardHandlers from "./utils/useTweetCardHandlers";
import CustomTooltip from "./ui/tooltip";

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

/* eslint-disable react/display-name */
const TweetCard = React.memo(({ data, isRelate, isRetweet, children }: any) => {
  const {
    content,
    images,
    id,
    likedBy,
    retweetedBy,
    bookmarkedBy,
    author,
    _count,
    createdAt,
  } = data;

  const router = useRouter();

  const [isLiked, setLiked] = useState(false);
  const [isReplyDialogOpen, setReplyDialogOpen] = useState(false);
  const [isRetweeted, setRetweeted] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);
  const [tweetId, setTweetId] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const { data: user } = useGetUser();
  const handlers = useTweetCardHandlers({
    isLiked,
    isRetweeted,
    isBookmarked,
    _count,
    author,
    setLiked,
    setRetweeted,
    setBookmarked,
    setTweetId,
    setReplyDialogOpen,
    router,
  });

  useEffect(() => {
    if (user) {
      const hasUserLiked = likedBy?.some((like: any) => like.userId == user.id);
      const hasUserRetweeted = retweetedBy?.some(
        (rt: any) => rt.userId == user.id
      );
      const hasUserBookmark = bookmarkedBy?.some(
        (bookmark: any) => bookmark.userId == user.id
      );

      setBookmarked(hasUserBookmark);
      setLiked(hasUserLiked);
      setRetweeted(hasUserRetweeted);
    }
  }, [user, likedBy, retweetedBy]);

  const svg = [
    {
      iconName: "ReplyIcon",
      fillColor: "group-hover:fill-accent-blue",
      textColor: "group-hover:text-accent-blue",
      bgColor: "hover:bg-accent-blue/10",
      totalAmount: _count?.replies !== 0 ? _count?.replies : "",
      onClick: (e: any) => handlers.handleReplyClick(e, id),
    },
    {
      iconName: "RepostIcon",
      fillColor: isRetweeted
        ? "fill-accent-green"
        : "group-hover:fill-accent-green",
      textColor: isRetweeted
        ? "text-accent-green"
        : "group-hover:text-accent-green",
      bgColor: "hover:bg-accent-green/10",
      totalAmount: _count?.retweetedBy !== 0 ? _count?.retweetedBy : "",
      onClick: (e: any) => handlers.handleRetweet(e, id),
    },
    {
      iconName: isLiked ? "SolidLikeIcon" : "LikeIcon",
      fillColor: "group-hover:fill-accent-pink",
      bgColor: "hover:bg-accent-pink/10",
      textColor: isLiked
        ? "group-hover:text-accent-pink text-accent-pink"
        : "group-hover:text-accent-pink",
      totalAmount: _count?.likedBy !== 0 ? _count?.likedBy : "",
      onClick: (e: any) => handlers.handleLikeClick(e, id),
    },
    {
      iconName: "ViewIcon",
      fillColor: "group-hover:fill-accent-blue",
      bgColor: "hover:bg-accent-blue/10",
      textColor: "group-hover:text-accent-blue",
      totalAmount: "",
    },
  ];

  return (
    <>
      <ReplyDialog
        isOpen={isReplyDialogOpen}
        setIsOpen={setReplyDialogOpen}
        id={tweetId}
      />

      <ImageDialog
        isOpen={imageDialogOpen}
        setImageDialogOpen={setImageDialogOpen}
        selectedImageId={selectedImageId}
        images={images}
      />

      <Link
        href={`/tweet/${id}`}
        className={`cursor-pointer relative flex flex-col gap-y-2 px-4 py-2 dark:hover:bg-dark-primary/[0.03] hover:bg-[#F7F7F7] outline-none duration-200 ${
          !isRelate
            ? "border-b border-light-border dark:border-dark-border "
            : null
        }`}
      >
        {isRetweet && (
          <div className="flex flex-row ml-5 items-center">
            <CustomIcon
              iconName="RepostIcon"
              className={`h-5 w-5 fill-[#8f93a0] mr-2`}
            />
            <p className="text-xs font-semibold text-[#8f93a0]">You reposted</p>
          </div>
        )}
        <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 w-full">
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
            <TweetHeader
              author={author}
              createdAt={createdAt}
              handleAuthorClick={handlers.handleAuthorClick}
            />
            <div className="text-light-primary dark:text-dark-primary break-words inline-block">
              {content}
            </div>

            {images.length > 0 && (
              <RenderImages
                setSelectedImageId={setSelectedImageId}
                setImageDialogOpen={setImageDialogOpen}
                imageDialogOpen={imageDialogOpen}
                images={images}
              />
            )}

            <div className="h-8 bg flex flex-row mt-1 -px-4">
              <div className="bg w-[85%] flex flex-row items-center px-0">
                {svg.map(
                  ({
                    iconName,
                    fillColor,
                    bgColor,
                    textColor,
                    totalAmount,
                    onClick,
                  }) => (
                    <IconButton
                      key={iconName}
                      data={{
                        iconName,
                        fillColor,
                        bgColor,
                        textColor,
                        totalAmount,
                        onClick,
                      }}
                    />
                  )
                )}
              </div>
              <div className="sm:w-[15%] w-[25%] flex flex-row items-center justify-center">
                <CustomTooltip
                  trigger={
                    <button
                      onClick={(e: any) => handlers.handleBookmark(e, id)}
                    >
                      <div
                        className={`flex justify-center rounded-full p-2 hover:bg-accent-blue/10`}
                      >
                        <CustomIcon
                          iconName={
                            isBookmarked ? "SolidBookmarkIcon" : "BookmarkIcon"
                          }
                          className={`h-5 w-5 hover:fill-accent-blue ${
                            isBookmarked ? "fill-accent-blue" : "fill-[#6A6F74]"
                          }`}
                        />
                      </div>
                    </button>
                  }
                  content={"Bookmark"}
                />

                <CustomTooltip
                  trigger={
                    <div
                      className={`flex justify-center -mr-4 rounded-full p-2 hover:bg-accent-blue/10`}
                    >
                      <CustomIcon
                        iconName="ShareIcon"
                        className={`h-5 w-5 hover:fill-accent-blue fill-[#6A6F74]`}
                      />
                    </div>
                  }
                  content={"Share"}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {children}
    </>
  );
});

export default TweetCard;
