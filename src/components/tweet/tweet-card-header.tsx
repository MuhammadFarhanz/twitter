import React from "react";
import { CustomIcon } from "../ui/custom-icon";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import { formatTimeAgo } from "./utils/formatTime";
import UserHoverCard from "./user-hover-card";

import CustomTooltip from "./ui/tooltip";

type TweetHeaderProps = {
  author: {
    name: string;
    username: string;
    is_verified: boolean;
  };
  createdAt: string;
  handleAuthorClick: any;
};

const TweetHeader: React.FC<TweetHeaderProps> = ({
  author,
  createdAt,
  handleAuthorClick,
}) => {
  return (
    <div className="flex justify-between gap-2 text-light-secondary dark:text-dark-secondary">
      <div className="flex gap-1 truncate xs:overflow-visible xs:whitespace-normal">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div
              onClick={handleAuthorClick}
              className="flex items-center gap-1 truncate font-bold custom-underline text-light-primary dark:text-dark-primary"
            >
              {author?.name}
              {author?.is_verified && (
                <CustomIcon
                  iconName="CheckmarkIcon"
                  className="fill-blue-400 h-5"
                />
              )}
            </div>
          </HoverCardTrigger>
          <UserHoverCard author={author} />
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <div
              className="truncate text-light-secondary dark:text-dark-secondary "
              onClick={handleAuthorClick}
            >
              @{author?.username}
            </div>
          </HoverCardTrigger>
          <UserHoverCard author={author} />
        </HoverCard>

        <div className="flex gap-1">
          <i>·</i>
          <div className="group relative text-[#8f93a0]">
            <div className="whitespace-nowrap text-[15px]">
              {formatTimeAgo(createdAt)}
            </div>
          </div>
        </div>
      </div>
      <CustomTooltip
        trigger={
          <div className="p-1 rounded-full hover:bg-accent-blue/10">
            <CustomIcon
              iconName="MoreIcon"
              className="w-5 h-5 hover:fill-accent-blue fill-[#8f93a0]"
            />
          </div>
        }
        content="More"
      />
    </div>
  );
};

export default TweetHeader;
