import { useGetTweetById } from "@/api/useGetTweetById";
import { useGetUser } from "@/api/useGetUser";
import Layout from "@/components/layout/main-layout";
import TweetCard from "@/components/tweet/tweet-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomIcon } from "@/components/ui/custom-icon";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import React, { ChangeEvent, useRef } from "react";

function Post({ data: tweetData }: any) {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetTweetById(id);
  const { data: user } = useGetUser();
  const ref = useRef<HTMLElement>(null);

  console.log(data, "kok");
  const { content, images, createdAt, author } = data || "";

  console.log(author, "cok");
  const svg = [
    {
      iconName: "ReplyIcon",
      totalAmount: 96,
    },
    {
      iconName: "RepostIcon",
      totalAmount: 23,
    },
    {
      iconName: "LikeIcon",
      totalAmount: 324,
    },
    {
      iconName: "BookmarkIcon",
      totalAmount: 22,
    },
    // {
    //   iconName: "ShareIcon",
    // },
  ];

  if (!id) {
    return <div>Loading...</div>;
  }
  // console.log(data);

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

  const handleInput = (e: any) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${e.target.scrollHeight - 16}px`;
    }
  };

  return (
    <Layout>
      <main
        className="hover-animation flex min-h-screen w-full max-w-[600px] flex-col pb-96  xs:border-x border-x-0
       border-light-border dark:border-dark-border "
      >
        {/* <div>{id}</div> */}
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

        {!data ? (
          <Spinner />
        ) : (
          <>
            <div className=" relative flex flex-col gap-y-4 px-4 pt-3  outline-none duration-200 ">
              <div className="grid gap-x-3 gap-y-1 bg-green-30">
                <div className="flex min-w-0 flex-col text-white b">
                  <div className="flex justify-between gap-2 text-light-secondary dark:text-dark-secondary ">
                    <div>
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
                          </div>
                          <div className="truncate cursor-pointer  text-light-secondary dark:text-dark-secondary">
                            @{author?.username}
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

                  {images && (
                    <div
                      className={`items-center w-full mt-2 rounded-2xl overflow-hidden p-0 bg-red-400 mb-3 ${
                        imageGridStyles[images?.length] || ""
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
                            {images
                              .slice(1, 3)
                              .map((subImage: any, subIndex: any) => (
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
                  )}

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
                      {svg.map(({ ...data }, index) => (
                        <button
                          key={data.iconName}
                          className="w-1/4 bg-orage-400 flex flex-row items-center "
                        >
                          <CustomIcon
                            iconName={data.iconName as any}
                            border-b
                            className={`h-6 w-6 hover:fill-main-accent fill-light-secondary dark:fill-dark-secondary mr-2 `}
                          />
                          <p className="text-xs text-light-secondary dark:text-dark-secondary ">
                            {data.totalAmount}
                          </p>
                        </button>
                      ))}
                    </div>
                    <div className="bg-yel0 flex flex-row items-center justify-center bg-lim-400">
                      <CustomIcon
                        iconName="ShareIcon"
                        className="h-6 w-6 fill-light-secondary dark:fill-dark-secondary "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-auto flex items-center border-b border-light-border dark:border-dark-border px-4 py-1">
              <Avatar>
                <AvatarImage src={user?.profile_pic} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="bg-bl w-full h-full mx-3 items-center">
                <Textarea
                  onInput={handleInput}
                  className="h-[30px] border-0 w-full overflow-hidden resize-none leading-10 bg-transparent text-xl outline-none placeholder:text-light-secondary dark:placeholder:text-dark-secondary"
                  placeholder="Post your reply"
                ></Textarea>
              </div>

              <button
                disabled={true}
                className=" rounded-full bg-main-accent px-4 py-1.5 font-bold text-white enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75"
              >
                Reply
              </button>
            </div>
          </>
        )}
        {!data?.replies ? (
          <Spinner />
        ) : (
          data?.replies.map((tweetData: any) => (
            <TweetCard key={tweetData.id} data={tweetData} />
          ))
        )}
      </main>
    </Layout>
  );
}

export default Post;
