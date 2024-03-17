import React, { useEffect, useState } from "react";
import { useGetUser } from "../../api/useGetUser";
import { CustomIcon } from "@/components/ui/custom-icon";
import Background from "../../../public/black-and-white.jpg";
import Link from "next/link";
import { useGetUserById } from "@/api/useGetUserById";
import { useRouter } from "next/router";
import TweetCard from "@/components/tweet/tweet";
import NavLink from "./nav-links";
import EditProfileButton from "./edit-button";
import FollowButton from "./follow-button";
import { useFollowUser } from "@/api/useFollowUser";
import NotFound from "./not-found";

function Profile({ children, username, id }: any) {
  const router = useRouter();
  const { data: currentUser } = useGetUser();
  const {
    data: userProfile,
    refetch,
    isError,
    error,
  } = useGetUserById(username);
  const { mutateAsync } = useFollowUser(userProfile?.id);

  const user = userProfile;
  const isCurrentUser = currentUser?.username === user?.username;
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    // if (!currentUser || !userProfile || !userProfile.followers) return;
    if (user) {
      const isUserFollowing = user?.followedBy?.some(
        (follower: any) => follower.id === currentUser?.id
      );

      setIsFollowing(isUserFollowing);
    }
  }, [userProfile, currentUser]);

  const handleFollowToggle = async () => {
    if (!currentUser || !userProfile) return;
    // Toggle the follow state
    mutateAsync();
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
      <header className="w-full h-14 flex flex-row items-center">
        <button
          onClick={() => router.back()}
          className="hover:bg-light-primary/10 dark:hover:bg-dark-primary/10  w-10 h-10 rounded-full mx-4  flex items-center justify-center"
        >
          <CustomIcon
            iconName="BackIcon"
            className="w-6 h-6 fill-light-primary dark:fill-dark-primary cursor-pointer"
          />
        </button>

        <div>
          <p className="font-bold text-lg text-light-primary dark:text-dark-primary">
            {user ? user?.name : "Profile"}
          </p>
          <p className="text-light-secondary dark:text-dark-secondary">
            {user?._count?.tweets} Post
          </p>
        </div>
      </header>

      <div className="xs:h-auto w-full">
        <div className="h-[200px] dark:bg-zinc-800 bg-slate-300">
          {/* <img
            className="h-full w-full object-cover "
            src="https://mdbootstrap.com/img/new/standard/people/087.jpg"
            alt=""
          /> */}
        </div>

        <div className="h-full">
          <div className="flex justify-between pl-4 p-2 h-20 ">
            <div className="xs:w-36 xs:h-36 h-32 w-32 rounded-full flex justify-center items-center xs:p-[5px]  dark:bg-zinc-900 bg-zinc-200 border-[2px] border-main-background xs:-translate-y-[55%] -translate-y-[50%] ">
              <img
                className="rounded-full h-full w-full "
                src={user?.profile_pic}
              ></img>
            </div>
            {!isCurrentUser ? (
              <FollowButton
                id={user?.id}
                onFollowToggle={handleFollowToggle}
                isFollowing={isFollowing}
              />
            ) : (
              <EditProfileButton />
            )}
          </div>

          {!isError && (
            <div className="pb-4 mt-3 mx-4 ">
              <p className="font-black flex flex-row items-center text-xl">
                {user?.name}
                <CustomIcon
                  iconName="CheckmarkIcon"
                  className="fill-blue-400 h-6 ml-1 mt-1"
                />
              </p>
              <p className="text-light-secondary dark:text-dark-secondary">
                @{user?.username}
              </p>
              <div className="mt-3">{user?.bio}</div>
              <div className="flex flex-row mt-3">
                <CustomIcon
                  iconName="CalenderIcon"
                  className="fill-light-secondary dark:fill-dark-secondary w-5 h-5 mr-2"
                />
                <p className="text-light-secondary dark:text-dark-secondary text-sm">
                  Joined June 2021
                </p>
              </div>

              <div className=" flex flex-row mt-3 text-sm">
                <p className="mr-2 flex flex-row hover:underline cursor-pointer">
                  <p className="font-bold mr-1">{user?._count?.following}</p>
                  <p className=" text-light-secondary dark:text-dark-secondary">
                    Following
                  </p>
                </p>
                <p className="flex flex-row hover:underline cursor-pointer">
                  <p className="font-bold mr-1 ">{user?._count?.followedBy}</p>
                  <p className="text-light-secondary dark:text-dark-secondary ">
                    Follower
                  </p>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isError && (
        <div className="h-14 flex flex-row items-center border-b font-medium dark:border-dark-border  border-light-border ">
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

      <div className="">
        {children
          ? children
          : user?.tweets?.map((tweetData: any) => (
              <TweetCard key={tweetData.id} data={tweetData} />
            ))}
        {/* This account doesn’t exist Try searching for another. */}
      </div>
    </main>
  );
}

export default Profile;
