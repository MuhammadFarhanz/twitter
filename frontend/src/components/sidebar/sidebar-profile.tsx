import React, { useState } from "react";
import { CustomIcon } from "../ui/custom-icon";
import { useGetUser } from "@/lib/hooks/useGetUser";
import { AvatarProfile } from "../tweet/ui/avatar";
import { useLogoutUser } from "@/lib/hooks/useLogoutUser";

function SidebarProfile() {
  const { data: user } = useGetUser();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useLogoutUser();

  return (
    <>
      <section className="relative" onClick={() => setIsOpen(!isOpen)}>
        {isOpen && (
          <div className="bg-main-background border fixed bottom-16 w-72 pt-2 pb-2 hover:cursor-pointer  rounded-2xl mb-4 dark:border-dark-border font-semibold">
            <p className="text-light-primary dark:text-dark-primary hover:bg-light-primary/10 w-full text-left dark:hover:bg-dark-primary/10 px-4 py-2 ">
              Add an existing account
            </p>
            <button
              onClick={() => mutateAsync()}
              className="text-light-primary dark:text-dark-primary hover:bg-light-primary/10 w-full text-left dark:hover:bg-dark-primary/10 px-4 py-2 "
            >
              Log out @{user?.username}
            </button>
          </div>
        )}
        <button className="justify-between p-3 rounded-full xl:px-3 xl:py-1 items-center flex flex-row w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10">
          <div className="grow-0">
            <AvatarProfile
              className="w-[40px] h-[40px] mr-1"
              src={user?.profile_pic}
            />
          </div>
          <div className="flex-row grow truncate mx-2 xl:flex hidden">
            <div className="flex-col text-left  ">
              <p className="text-light-primary dark:text-dark-primary truncate font-semibold">
                {user?.name || "username"}
              </p>
              <p className="text-dark-secondary">@{user?.username}</p>
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
    </>
  );
}

export default SidebarProfile;
