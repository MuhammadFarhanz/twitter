import React from "react";
import { HoverCardContent } from "../ui/hover-card";
import { AvatarProfile } from "./ui/avatar";
import FollowButton from "../user/follow-button";
import { CustomIcon } from "../ui/custom-icon";

function UserHoverCard({ author }: any) {
  return (
    <HoverCardContent className="w-80 text-light-primary dark:text-dark-primary bg-main-background border rounded-2xl dark:border-dark-border ">
      <div className="flex relative justify-between self space-x-4">
        <AvatarProfile src={author?.profile_pic} className="w-14 h-14" />
        <div className="absolute top-0 right-0">
          <FollowButton moreicon={true} />
        </div>
      </div>

      <div className="my-2">
        <p className="font-black  flex flex-row items-center text-xl truncate">
          {author?.name}
          {author?.is_verified && (
            <CustomIcon
              iconName="CheckmarkIcon"
              className="fill-blue-400 h-6 ml-1 mt-1"
            />
          )}
        </p>
        <p className="text-light-secondary dark:text-dark-secondary">
          @{author?.username}
        </p>

        <div className="mt-3 break-words whitespace-pre-wrap ">
          {author?.bio}
        </div>

        <div className=" flex flex-row mt-3 text-sm">
          <p className="mr-2 flex flex-row hover:underline cursor-pointer">
            <p className="font-bold mr-1">{author?._count?.following}</p>
            <p className=" text-light-secondary dark:text-dark-secondary">
              Following
            </p>
          </p>
          <p className="flex flex-row hover:underline cursor-pointer">
            <p className="font-bold mr-1 ">{author?._count?.followedBy}</p>
            <p className="text-light-secondary dark:text-dark-secondary ">
              Follower
            </p>
          </p>
        </div>
      </div>
    </HoverCardContent>
  );
}

export default UserHoverCard;
