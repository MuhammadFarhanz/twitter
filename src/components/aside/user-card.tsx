import React from "react";
import { AvatarProfile } from "../tweet/ui/avatar";
import FollowButton from "../user/follow-button";

function UserCard({ user }: any) {
  return (
    <div>
      <button className="px-4 h-[70px] justify-between xl:py-1 items-center flex flex-row w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10">
        <div className="grow-0">
          <AvatarProfile src={user?.profile_pic} />
        </div>
        <div className="flex-row grow truncate mx-2 mr-8">
          <div className="flex-col text-left  ">
            <p className="text-light-primary  dark:text-dark-primary truncate font-semibold">
              {user?.name}
            </p>
            <p className="text-dark-secondary">@{user?.username}</p>
          </div>
        </div>
        <FollowButton moreicon={true} className="h-[31px]" />
      </button>
    </div>
  );
}

export default UserCard;
