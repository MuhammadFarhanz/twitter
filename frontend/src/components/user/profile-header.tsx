import React from "react";
import { CustomIcon } from "../ui/custom-icon";

function ProfileHeader({ router, user }: any) {
  return (
    <header className="w-full h-14 flex flex-row items-center">
      <button
        onClick={() => router.back()}
        className="hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 w-8 h-6 sm:w-10 sm:h-10 mx-4 flex items-center justify-center"
      >
        <CustomIcon
          iconName="BackIcon"
          className="h-5 w-5 sm:w-6 sm:h-6 fill-light-primary dark:fill-dark-primary cursor-pointer"
        />
      </button>

      <div>
        <p className="font-bold flex flex-row sm:text-lg text-base text-light-primary dark:text-dark-primary">
          {user ? user?.name : "Profile"}
          {user?.is_verified && (
            <CustomIcon
              iconName="CheckmarkIcon"
              className="fill-blue-400 h-6 ml-1 mt-[2px]"
            />
          )}
        </p>
        <p className="text-light-secondary dark:text-dark-secondary text-sm sm:text-base">
          {user?._count?.tweets} posts
        </p>
      </div>
    </header>
  );
}

export default ProfileHeader;
