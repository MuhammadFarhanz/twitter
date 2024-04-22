import React, { memo, useEffect, useState } from "react";
import { useGetUser } from "../../api/useGetUser";
import { useRouter } from "next/router";
import NavLink from "./nav-links";
import { useFollowUser } from "@/api/useFollowUser";
import NotFound from "./not-found";
import TweetCard from "../tweet/tweet-card";
import Spinner from "../ui/spinner";
import ProfileHeader from "./profile-header";
import ProfileAvatarWithFollowButton from "./profile-avatar-with-button";
import ProfileDetails from "./profile-details";

const Profile = memo(
  ({ children, user, isError, refetch, setIsFollowing, isFollowing }: any) => {
    const router = useRouter();
    const { data: currentUser } = useGetUser();
    const { mutateAsync } = useFollowUser(user?.id);

    const isCurrentUser = currentUser?.username === user?.username;

    useEffect(() => {
      if (user) {
        const isUserFollowing = user?.followedBy?.some(
          (follower: any) => follower.id === currentUser?.id
        );
        setIsFollowing(isUserFollowing);
      }
    }, [user]);

    const handleFollowToggle = async () => {
      await mutateAsync();
      setIsFollowing(!isFollowing);
      await refetch();
    };

    const nav = [
      { name: "Tweets", path: "" },
      { name: "Replies", path: "replies" },
      { name: "Highlights", path: "highlights" },
      { name: "Media", path: "media" },
      { name: "Likes", path: "likes" },
    ] as const;

    return (
      <main
        className="hover-animation flex min-h-screen w-full max-w-[600px] flex-col border-x-0
      border-light-border dark:border-dark-border pb-96 xs:border-x"
      >
        <>
          <ProfileHeader router={router} user={user} />
          <div className="xs:h-auto w-full">
            <div
              className="sm:h-[200px] h-[130px] dark:bg-zinc-800 bg-slate-300  bg-center bg-cover"
              // style={{ backgroundImage: `url(${user?.profile_pic})` }}
            ></div>

            <ProfileAvatarWithFollowButton
              user={user}
              isError={isError}
              isCurrentUser={isCurrentUser}
              isFollowing={isFollowing}
              handleFollowToggle={handleFollowToggle}
            />

            {!isError && <ProfileDetails user={user} />}
          </div>

          {!isError && user && (
            <div className="h-12 flex flex-row items-center border-b font-medium dark:border-dark-border  border-light-border ">
              {nav.map(({ name, path }) => (
                <NavLink
                  name={name}
                  path={path}
                  key={name}
                  username={user?.username}
                />
              ))}
            </div>
          )}

          {isError && <NotFound />}
          {!user?.tweets?.length && !isError && <Spinner />}

          {children ? (
            children
          ) : (
            <>
              {[user?.tweets, user?.retweets]
                .filter(Array.isArray)
                .flat()
                .sort((a, b) => {
                  const createdAtA = new Date(a?.createdAt || 0).getTime();
                  const createdAtB = new Date(b?.createdAt || 0).getTime();
                  return createdAtB - createdAtA;
                })
                .map((tweetData: any) => (
                  <TweetCard
                    key={tweetData.id}
                    data={tweetData.tweet || tweetData}
                    isRetweet={!!tweetData.tweet}
                  />
                ))}
            </>
          )}
        </>
      </main>
    );
  }
);

export default Profile;
