import React from "react";
import { CustomIcon } from "../ui/custom-icon";
import useWindow from "@/lib/hooks/window-context";

function FeedHeader() {
  const { isMobile } = useWindow();

  return (
    <header className="flex sm:sticky top-0 z-20 bg-main-background/70 backdrop-blur-sm h-14 text-light-primary dark:text-dark-primary border-b font-bold border-light-border dark:border-dark-border">
      <button className=" w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 ">
        For you
      </button>
      <button className="w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 ">
        Following
      </button>
      {!isMobile && (
        <div className=" w-32 flex items-center justify-center">
          <CustomIcon
            iconName="SettingsIcon"
            className="fill-light-primary dark:fill-dark-primary h-6 w-6"
          />
        </div>
      )}
    </header>
  );
}

export default FeedHeader;
