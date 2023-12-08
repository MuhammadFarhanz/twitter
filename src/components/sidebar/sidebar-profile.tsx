import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CustomIcon } from "../ui/custom-icon";

function SidebarProfile() {
  return (
    <section className="relative ">
      <button className="justify-between p-3 rounded-full xl:px-3 xl:py-1 items-center flex flex-row w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10">
        <div className="grow-0">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-row grow truncate mx-4 xl:flex hidden">
          <div className="flex-col text-left  ">
            <p className="text-light-primary dark:text-dark-primary ">
              Nameaaaaaaaaaaaaaaaaaaaa
            </p>
            <p className="text-dark-secondary">@staynaughty</p>
          </div>
        </div>
        <div className="xl:flex grow-0 hidden justify-center items-center ">
          <CustomIcon
            iconName="MoreIcon"
            className="w-5 h-5 fill-light-primary dark:fill-dark-primary"
          />
        </div>
      </button>
    </section>
  );
}

export default SidebarProfile;
