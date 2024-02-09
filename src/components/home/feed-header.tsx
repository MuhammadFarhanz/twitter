import React from "react";
import { CustomIcon } from "../ui/custom-icon";

function FeedHeader() {
  return (
    <header className="flex h-14 text-light-primary dark:text-dark-primary border-b font-bold border-light-border dark:border-dark-border">
      <button className=" w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 ">
        For you
      </button>
      <button className="w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 ">
        Following
      </button>
      <div className=" w-32 flex items-center justify-center">
        <CustomIcon
          iconName="SettingsIcon"
          className="fill-light-primary dark:fill-dark-primary h-6 w-6"
        />
      </div>
    </header>
  );
}

export default FeedHeader;
