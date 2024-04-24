import { useGetTweetById } from "@/api/useGetTweetById";
import { useGetUser } from "@/api/useGetUser";
import { useRetweet } from "@/api/useRetweet";
import Layout from "@/components/layout/main-layout";
import IconButton from "@/components/tweet/icon-button";
import ImageDialog from "@/components/tweet/images-dialog";
import ImageInput from "@/components/tweet/input/image-input";
import TextareaInput from "@/components/tweet/input/textarea-input";
import RenderImages from "@/components/tweet/render-images";
import ReplyDialog from "@/components/tweet/reply-dialog";
import TweetCard from "@/components/tweet/tweet-card";
import { AvatarProfile } from "@/components/tweet/ui/avatar";
import ImageComponent from "@/components/tweet/ui/image-preview";
import TweetButton from "@/components/tweet/ui/tweet-button";
import useTweetCardHandlers from "@/components/tweet/utils/useTweetCardHandlers";
import UserHoverCard from "@/components/tweet/user-hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomIcon } from "@/components/ui/custom-icon";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useTweetFormLogic from "@/components/tweet/utils/useTweetForm";

function Post() {
  const router = useRouter();
  const { id: routerId } = router.query;

  const { data: tweetData } = useGetTweetById(routerId);
  const {
    id,
    content,
    images,
    likedBy,
    retweetedBy,
    bookmarkedBy,
    author,
    _count,
    createdAt,
    parent,
    replies,
  } = tweetData;
  const { data: user, error: userError } = useGetUser();

  const [isLiked, setLiked] = useState(false);
  const [isReplyDialogOpen, setReplyDialogOpen] = useState(false);
  const [isRetweeted, setRetweeted] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);
  const [tweetId, setTweetId] = useState(0);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { mutateAsync: retweet } = useRetweet();

  const ref = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { formik, handleFileInputChange } = useTweetFormLogic({
    id: tweetData?.id,
    onSuccess() {
      setReplyDialogOpen(!isReplyDialogOpen);
    },
  });

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
        (rt: any) => rt.userId === user.id
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
      bgColor: "hover:bg-accent-blue/30",
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
      bgColor: "hover:bg-accent-green/30",
      totalAmount: _count?.retweetedBy !== 0 ? _count?.retweetedBy : "",
      onClick: (e: any) => handlers.handleRetweet(e, id),
    },
    {
      iconName: isLiked ? "SolidLikeIcon" : "LikeIcon",
      fillColor: "group-hover:fill-accent-pink",
      bgColor: "hover:bg-accent-pink/30",
      textColor: isLiked
        ? "group-hover:text-accent-pink text-accent-pink"
        : "group-hover:text-accent-pink",
      totalAmount: _count?.likedBy !== 0 ? _count?.likedBy : "",
      onClick: (e: any) => handlers.handleLikeClick(e, id),
    },
    {
      iconName: "BookmarkIcon",
      fillColor: isBookmarked
        ? "fill-accent-blue"
        : "group-hover:fill-accent-blue",
      textColor: isBookmarked
        ? "text-accent-blue"
        : "group-hover:text-accent-blue",
      bgColor: "hover:bg-accent-blue/30",
      totalAmount: "",
      onClick: (e: any) => handlers.handleBookmark(e, id),
    },
  ];

  const dateString = createdAt;
  const dateObject = new Date(dateString);

  const formattedDate = dateObject.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = dateObject.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });

  const formattedDateTime = `${formattedTime} · ${formattedDate}`;

  const imageGridStyles: any = {
    1: "grid-rows-1",
    2: "grid grid-cols-2 grid-rows-1 gap-[2px]",
    3: "w-full h-80",
    4: "grid grid-cols-2 gap-[2px]",
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight - 16}px`;
    }
  };
  const handleTextareaFocus = () => {
    setIsFocused(true);
  };

  return (
    <Layout>
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
      <main
        className="hover-animation flex min-h-screen w-full max-w-[600px] flex-col pb-96  xs:border-x border-x-0
       border-light-border dark:border-dark-border "
      >
        <header className="w-full h-14 sticky flex flex-row items-center ">
          <button
            onClick={() => router.back()}
            className="hover:bg-light-primary/10 dark:hover:bg-dark-primary/10  w-10 h-10 rounded-full mx-4  flex items-center justify-center"
          >
            <CustomIcon
              iconName="BackIcon"
              className="w-6 h-6 fill-light-primary dark:fill-dark-primary cursor-pointer"
            />
          </button>

          <p className="font-bold text-lg text-light-primary dark:text-dark-primary">
            Post
          </p>
        </header>

        {parent && <TweetCard key={parent?.id} data={parent} isRelate={true} />}

        {!tweetData ? (
          <Spinner />
        ) : (
          <>
            <div className=" relative flex flex-col gap-y-4 px-4 pt-3  outline-none duration-200 ">
              <div className="grid gap-x-3 gap-y-1 bg-green-30">
                <div className="flex min-w-0 flex-col text-white">
                  <div className="flex justify-between gap-2 text-light-secondary dark:text-dark-secondary">
                    <div className="flex flex-row gap-2 h-12">
                      <div className="group relative self-start text-light-primary dark:text-dark-primary [&>div]:translate-y-2 ">
                        <Avatar>
                          <AvatarImage
                            src={author?.profile_pic}
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex gap-1 cursor-pointer truncate font-bold custom-underline text-light-primary dark:text-dark-primary">
                          {author?.name}
                          {author?.is_verified && (
                            <CustomIcon
                              iconName="CheckmarkIcon"
                              className="fill-blue-400 h-6 ml-1 mt-[2px]"
                            />
                          )}
                        </div>
                        <div className="truncate cursor-pointer  text-light-secondary dark:text-dark-secondary">
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <div
                                className="truncate text-light-secondary dark:text-dark-secondary hover:text-red-400"
                                onClick={handlers.handleAuthorClick}
                              >
                                @{author?.username}
                              </div>
                            </HoverCardTrigger>
                            <UserHoverCard author={author} />
                          </HoverCard>
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

                  <div className="my-1 text-light-primary dark:text-dark-primary break-words inline-block">
                    {content}
                  </div>
                  <div
                    className={`items-center w-full mt-2 rounded-2xl overflow-hidden p-0 mb-3 ${
                      imageGridStyles[images?.length] || ""
                    }`}
                  >
                    <RenderImages
                      setSelectedImageId={setSelectedImageId}
                      setImageDialogOpen={setImageDialogOpen}
                      imageDialogOpen={imageDialogOpen}
                      images={images}
                    />
                  </div>

                  <div className="flex items-center  text-sm text-light-secondary dark:text-dark-secondary ">
                    <p>{formattedDateTime}</p>&nbsp;·&nbsp;
                    <p className="text-light-primary dark:text-dark-primary">
                      4.1M{" "}
                    </p>
                    &nbsp;Views
                  </div>

                  <div
                    className="h-12 bg flex flex-row mt-2 border-t border-b
                border-light-border dark:border-dark-border"
                  >
                    <div className=" w-full flex flex-row items-center">
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
                    <div className="flex flex-row items-center justify-center">
                      <CustomIcon
                        iconName="ShareIcon"
                        className="h-6 w-6 fill-light-secondary dark:fill-dark-secondary "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="h-auto flex items-center border-b border-light-border dark:border-dark-border px-4 py-1"
            >
              <div className=" w-full h-full items-center flex flex-row">
                <div
                  className={`pr-3 relative w-12 h-full text-light-primary dark:text-dark-primary`}
                >
                  <AvatarProfile
                    className={`${
                      isFocused ? "absolute top-3" : "absolute top-2"
                    }`}
                    src={user?.profile_pic}
                  />
                </div>

                <div className="w-full ">
                  {isFocused && (
                    <div className="h-3 flex flex-row text-sm pb-3">
                      <p className="text-light-secondary dark:text-dark-secondary">
                        Replying to
                      </p>
                      <p className="text-main-accent ml-2">
                        @{author?.username}
                      </p>
                    </div>
                  )}
                  <TextareaInput
                    ref={ref}
                    onInput={handleTextareaInput}
                    maxLength={500}
                    value={formik?.values?.content}
                    onChange={formik?.handleChange}
                    onFocus={handleTextareaFocus}
                    className={" tracking-wide pt-4"}
                    placeholder="Post your reply"
                  />
                  <div
                    className={`items-center w-full mt-2 grid ${
                      formik.values.images.length > 1 ? "grid-cols-2" : ""
                    } gap-2`}
                  >
                    {formik?.values?.images.map((image: any, index: any) => (
                      <ImageComponent
                        key={index}
                        image={image}
                        index={index}
                        imageLength={formik.values.images.length}
                        onDeleteImage={handleDeleteImage}
                      />
                    ))}
                  </div>

                  {isFocused && (
                    <div>
                      <div className="flex w-full justify-between mt-2 mb-4">
                        <div className="flex items-center justify-center text-main-accent  ">
                          <ImageInput
                            handleFileInputChange={handleFileInputChange}
                          />
                        </div>
                        <TweetButton
                          disable={
                            formik.values.content ||
                            formik.values.images.length != 0
                              ? false
                              : true
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                disabled={true}
                className={`${
                  isFocused && "hidden"
                } rounded-full  disabled:bg-main-accent/80 disabled:text-white/90 bg-main-accent px-4 py-1.5 font-bold text-white enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75`}
              >
                Reply
              </button>
            </form>
          </>
        )}
        {replies?.map((tweetData: any) => (
          <TweetCard key={tweetData.id} data={tweetData} />
        ))}
      </main>
    </Layout>
  );
}

export default Post;
