import React from "react";
import { CustomIcon } from "@/components/ui/custom-icon";
import { format } from "date-fns";

const ProfileDetails = ({ user }: any) => {
  return (
    <div className="pb-4 mt-3 mx-4 overflow-hidden">
      {user && (
        <>
          <p className="font-black flex flex-row items-center sm:text-xl text-lg ">
            {user?.name}
            {user?.is_verified && (
              <CustomIcon
                iconName="CheckmarkIcon"
                className="fill-blue-400 h-6 ml-1 mt-1"
              />
            )}
          </p>
          <p className="text-light-secondary dark:text-dark-secondary">
            @{user?.username}
          </p>
          <div className="flex flex-row mt-3">
            <CustomIcon
              iconName="CalenderIcon"
              className="fill-light-secondary dark:fill-dark-secondary w-5 h-5 mr-2"
            />
            <p className="text-light-secondary dark:text-dark-secondary text-sm">
              Joined&nbsp;
              {user && format(user?.createdAt as string, "MMMM yyyy")}
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
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
