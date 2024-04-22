import React, { useState } from "react";
import { CustomIcon } from "../ui/custom-icon";
import useThemeStore from "@/lib/store/theme-store";
import { useFollowUser } from "@/api/useFollowUser";
import clsx from "clsx";

function FollowButton({
  moreicon,
  id,
  isFollowing,
  onFollowToggle,
  className,
}: any) {
  const { theme } = useThemeStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-row items-center ">
      {!moreicon && (
        <>
          <button className="h-9 w-9 flex justify-center items-center rounded-full border-light-border dark:border-dark-border border-[1px] mr-2 outline-none">
            <CustomIcon
              iconName="MoreIcon"
              className={`${
                theme == "light" ? "fill-black" : "fill-white"
              } w-5 h-5 outline-none border-0`}
            />
          </button>
          <button className="h-9 w-9 flex justify-center items-center rounded-full border-light-border dark:border-dark-border border-[1px] mr-2 outline-none">
            <CustomIcon
              iconName="EnvelopeIcon"
              className={`${
                theme == "light" ? "fill-black" : "fill-white"
              } w-5 h-5 outline-none border-0`}
            />
          </button>
        </>
      )}
      <button
        onClick={onFollowToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx(
          `${
            theme == "light" ? "bg-black text-white" : "  bg-white text-black"
          } ${
            isFollowing
              ? "dark:bg-black w-28 bg-white hover:bg-red-100 text-black/95 dark:text-white dark:hover:text-red-500 dark:hover:border-red-500  hover:text-red-500 hover:border-red-500 border"
              : "text-black dark:hover:bg-dark-primary/80"
          } mr-2 px-4  font-semibold text-sm h-[35px] hover:bg-light-primary/80  cursor-pointer   border-light-border dark:border-dark-border items-center flex justify-center rounded-full p-2`,
          className
        )}
      >
        {isFollowing ? (isHovered ? "Unfollow" : "Following") : "Follow"}
      </button>
    </div>
  );
}

export default FollowButton;
