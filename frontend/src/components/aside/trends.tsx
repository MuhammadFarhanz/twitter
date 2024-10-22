import React from "react";
import { CustomIcon } from "../ui/custom-icon";

function Trending() {
  const trendingData = [
    {
      category: "UEFA Champions League · Trending",
      label: "Manchaster United",
      posts: "790k posts",
    },
    {
      category: "UEFA Champions League · Trending",
      label: "Dortmund",
      posts: "176k posts",
    },
    {
      category: "Trending in Sports",
      label: "Mbappe",
      posts: "129k posts",
    },
    {
      category: "Trending in Sports",
      label: "Neymar",
      posts: "89k posts",
    },
    {
      category: "Trending in Football",
      label: "Onana",
      posts: "56k posts",
    },

    {
      category: "Trending in Technology",
      label: "Frontend Development",
      posts: "11k posts",
    },
    {
      category: "Politics · Trending",
      label: "Israel",
      posts: "1.22M posts",
    },
    {
      category: "Trending in Entertainment",
      label: "Boruto",
      posts: "24.2k posts",
    },

    // Add more topics in different categories as needed
  ];

  return (
    <>
      {trendingData.map((trend, index) => (
        <div
          key={index}
          className="p-0  cursor-pointer dark:hover:bg-dark-primary/10 hover:bg-light-primary/10 "
        >
          <div className="h-20 flex flex-col px-4 justify-center  ">
            <div className="flex flex-row justify-between">
              <p className="text-xs font-thin text-light-secondary dark:text-dark-secondary">
                {trend.category}
              </p>
              <CustomIcon
                iconName="MoreIcon"
                className="w-5 h-5 fill-[#8f93a0]"
              />
            </div>
            <p className="font-bold text-md text-light-primary dark:text-dark-primary">
              {trend.label}
            </p>
            <p className="text-xs font-thin text-light-secondary dark:text-dark-secondary">
              {trend.posts}
            </p>
          </div>
        </div>
      ))}
      <p className="px-4 h-14 flex items-center text-main-accent cursor-pointer dark:hover:bg-dark-primary/10 hover:bg-light-primary/10 text-[15px] leading-[20px]">
        Show more
      </p>
    </>
  );
}

export default Trending;
