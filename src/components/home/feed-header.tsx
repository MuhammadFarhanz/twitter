import React, { useState } from "react";
import { CustomIcon } from "../ui/custom-icon";
import useWindow from "@/lib/hooks/window-context";
import CustomTooltip from "../tweet/ui/tooltip";

function FeedHeader() {
  const { isMobile } = useWindow();
  const [activeTab, setActiveTab] = useState("ForYou"); // Default active tab

  return (
    <header className="flex sm:sticky top-0 z-20 bg-main-background/70 backdrop-blur-sm h-14 text-light-primary dark:text-dark-secondary border-b font-bold border-light-border dark:border-dark-border">
      <button
        className="flex justify-center flex-col items-center w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
        onClick={() => setActiveTab("ForYou")}
      >
        <div
          className={`w-20 flex flex-col h-full justify-center ${
            activeTab === "ForYou" ? "text-white" : ""
          }`}
        >
          <p>For you</p>
        </div>
        {activeTab === "ForYou" && (
          <i className="h-1 w-16 rounded-full bg-main-accent "></i>
        )}
      </button>
      <button
        className="flex justify-center flex-col items-center w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
        onClick={() => setActiveTab("Following")}
      >
        <div
          className={`w-20 flex flex-col h-full justify-center ${
            activeTab === "Following" ? "text-white" : ""
          }`}
        >
          <p>Following</p>
        </div>
        {activeTab === "Following" && (
          <i className="h-1 w-20 rounded-full bg-main-accent "></i>
        )}
      </button>
      {!isMobile && (
        <div className="w-32 flex items-center justify-center">
          <CustomTooltip
            trigger={
              <div className="flex justify-center rounded-full p-2 hover:bg-dark-primary/10 cursor-pointer">
                <CustomIcon
                  iconName="SettingsIcon"
                  className="fill-light-primary dark:fill-dark-primary h-5 w-5 "
                />
              </div>
            }
            content={"Timeline settings"}
          />
        </div>
      )}
    </header>
  );
}

export default FeedHeader;
