import { useGetBookmark } from "@/lib/hooks/useGetBookmark";
import { useGetUser } from "@/lib/hooks/useGetUser";
import Layout from "@/components/layout/main-layout";
import TweetCard from "@/components/tweet/tweet-card";
import { CustomIcon } from "@/components/ui/custom-icon";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";
import React from "react";

function Bookmarks() {
  const { data: currentUser } = useGetUser();
  const { data: userBookmark } = useGetBookmark();
  return (
    <div className="flex w-full justify-center gap-0 lg:gap-4 bg-main-background">
      <Layout>
        <div
          className="hover-animation flex min-h-screen w-full max-w-[600px] flex-col
             border-light-border dark:border-dark-border pb-96 xs:border-x "
        >
          <header className="flex justify-between p-3 bord border-light-border dark:border-dark-border ">
            <div>
              <p className="font-bold text-lg">Bookmarks</p>
              <p className="text-dark-secondary">@{currentUser?.username}</p>
            </div>
            <div className="mt-2">
              <CustomIcon
                iconName="MoreIcon"
                className="w-5 h-5 fill-[#8f93a0] "
              />
            </div>
          </header>
          {userBookmark ? (
            userBookmark.length > 0 ? (
              <div>
                {userBookmark.map((items: any) => (
                  <>
                    {console.log(items, "asususus")}
                    <TweetCard key={items.id} data={items.tweet} />
                  </>
                ))}
              </div>
            ) : (
              <div className="items-center flex flex-col">
                <Image
                  src={"/assets/no-bookmarks.png"}
                  width={400}
                  height={200}
                  sizes="100vw"
                  priority
                  className="w-[400px] h-[200px] mt-4 object-cover bg-slate0"
                  alt="No bookmarks"
                />
                <div className="flex items-center justify-center flex-col">
                  <h1 className="font-black text-3xl mb-1">
                    Save tweets for later
                  </h1>
                  <p className="text-dark-secondary">
                    Bookmark posts to easily find them again in the future.
                  </p>
                </div>
              </div>
            )
          ) : (
            <Spinner />
          )}
        </div>
      </Layout>
    </div>
  );
}

export default Bookmarks;
