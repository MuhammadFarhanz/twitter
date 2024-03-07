import React from "react";
import { CustomIcon } from "../ui/custom-icon";
import useThemeStore from "@/lib/store/theme-store";

function FollowButton() {
  const { theme } = useThemeStore();

  return (
    <div className="flex flex-row items-center">
      <button className="h-10 w-10 flex justify-center items-center rounded-full border-light-border dark:border-dark-border border-[1px] mr-2 outline-none">
        <CustomIcon
          iconName="MoreIcon"
          className={`${
            theme == "light" ? "fill-black" : "fill-white"
          } w-5 h-5 outline-none border-0`}
        />
      </button>
      <button
        className={`${
          theme == "light" ? "bg-black text-white" : "bg-white text-black "
        } mr-2 font-semibold text-sm h-10 hover:bg-light-primary/80 dark:hover:bg-dark-primary/80 cursor-pointer w-20 border-light-border dark:border-dark-border items-center flex justify-center border rounded-full p-2 `}
      >
        Follow
      </button>
    </div>
  );
}

export default FollowButton;
