import React, { useEffect, useState } from "react";
import { useGetUser } from "../../api/useGetUser";
import { CustomIcon } from "@/components/ui/custom-icon";
import Background from "../../../public/black-and-white.jpg";
import Link from "next/link";

function Profile({ children }: any) {
  const { data } = useGetUser();
  // const [profile, setProfile] = useState(null);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const result = await mutateAsync();
  //       setProfile(result.data);
  //     } catch (error) {
  //       // Handle errors
  //       console.log("cok");
  //     }
  //   };

  //   fetchUserProfile();
  // }, [mutateAsync]);

  // console.log(data.data.username);
  const tabs = ["posts", "replies", "highlights", "media", "likes"];

  return (
    <main
      className="hover-animation flex min-h-screen w-full max-w-[600px] flex-col border-x-0
      border-light-border dark:border-dark-border pb-96 xs:border-x"
    >
      <header className="w-full h-14 flex flex-row items-center">
        <div className="hover:bg-light-primary/10 dark:hover:bg-dark-primary/10  w-10 h-10 rounded-full mx-4  flex items-center justify-center">
          <CustomIcon
            iconName="BackIcon"
            className="w-6 h-6 fill-light-primary dark:fill-dark-primary cursor-pointer"
          />
        </div>
        <div>
          <p className="font-bold text-lg text-light-primary dark:text-dark-primary">
            username
          </p>
          <p className="text-light-secondary dark:text-dark-secondary">
            4 posts
          </p>
        </div>
      </header>

      <div className="xs:h-auto w-full">
        <div className="h-[200px] ">
          <img
            className="h-full w-full object-cover "
            src="https://mdbootstrap.com/img/new/standard/people/087.jpg"
            alt=""
          />
        </div>

        <div className="h-full">
          <div className="flex justify-between p-2 h-20">
            <div className="xs:w-40 xs:h-40 h-32 w-32 rounded-full flex justify-center items-center xs:p-2 p-1 bg-main-background xs:-translate-y-1/2 -translate-y-3/4 ">
              <div className="bg-orange-400 w-full h-full rounded-full"></div>
            </div>
            <div className="mt-1 mr-1 bg-main-background h-10 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 cursor-pointer w-28 border-light-border dark:border-dark-border items-center flex justify-center border rounded-full p-2 ">
              Edit profile
            </div>
          </div>

          <div className="pb-4 mt-4 mx-4 ">
            <p className="font-black  text-xl">{data?.data.username}</p>
            <p className="text-light-secondary dark:text-dark-secondary">
              @stayNaughty__
            </p>
            <div className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              quod, vero quos voluptatibus doloribus nam recusandae sed magnam
              rerum! Obcaecati tempore rem necessitatibus accusantium
              consequatur temporibus eos architecto harum saepe.
            </div>
            <div className="flex flex-row mt-3">
              <CustomIcon
                iconName="CalenderIcon"
                className="fill-light-secondary dark:fill-dark-secondary w-5 h-5 mr-2"
              />
              <p className="text-light-secondary dark:text-dark-secondary text-sm">
                Joined June 2021
              </p>
            </div>

            <div className=" flex flex-row mt-3 text-sm">
              <p className="mr-2 flex flex-row hover:underline cursor-pointer">
                <p className="font-bold mr-1">51</p>
                <p className=" text-light-secondary dark:text-dark-secondary">
                  Following
                </p>
              </p>
              <p className="flex flex-row hover:underline cursor-pointer">
                <p className="font-bold mr-1 ">51</p>
                <p className="text-light-secondary dark:text-dark-secondary ">
                  Follower
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-14 flex flex-row items-center border-b font-medium dark:border-dark-border  border-light-border ">
        {tabs.map((tab, index) => (
          <Link
            href={`/profile/${tab}`}
            key={index}
            className="flex-1 text-light-secondary dark:text-dark-secondary text-center hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 h-full w-full items-center flex justify-center cursor-pointer"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Link>
        ))}
      </div>

      <div className="bg-blue-400 h-20">{children}</div>
    </main>
  );
}

export default Profile;
