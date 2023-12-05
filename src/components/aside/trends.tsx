import React from "react";
import { CustomIcon } from "../ui/custom-icon";

function Trending() {
  const trendingData = [
    {
      category: "Technology",
      label: "Frontend Development",
      posts: "11k posts",
    },
    {
      category: "Technology",
      label: "Backend Development",
      posts: "8k posts",
    },
    {
      category: "Technology",
      label: "Mobile App Development",
      posts: "6k posts",
    },
    {
      category: "Technology",
      label: "Data Science",
      posts: "7k posts",
    },
    {
      category: "Design",
      label: "UI/UX Design",
      posts: "9k posts",
    },
    {
      category: "Fitness",
      label: "Fitness & Health",
      posts: "12k posts",
    },
    {
      category: "Art",
      label: "Art & Creativity",
      posts: "8k posts",
    },
    {
      category: "Science",
      label: "Science & Space",
      posts: "15k posts",
    },
    {
      category: "Entertainment",
      label: "Music & Entertainment",
      posts: "13k posts",
    },
    // Add more topics in different categories as needed
  ];

  return (
    <>
      {trendingData.map((trend, index) => (
        <div
          key={index}
          className="p-0  cursor-pointer  dark:hover:bg-dark-primary/10 hover:bg-light-primary/10 "
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
    </>
  );
}

export default Trending;
