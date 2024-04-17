import { useGetUser } from "@/api/useGetUser";
import { AvatarProfile } from "../tweet/ui/avatar";
import { CustomIcon } from "../ui/custom-icon";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import Trending from "./trends";
import FollowButton from "../user/follow-button";
import UserCard from "./user-card";
import { useGetRandomUser } from "@/api/getRandomUser";

export function Aside(): JSX.Element {
  const { data: user } = useGetUser();

  const { data } = useGetRandomUser();

  console.log(data, "asu");
  const nav = [
    "Terms of Service",
    "Privacy policy",
    "Cookie policy",
    "Accessibility",
    "Ads info",
    "More...",
    "© 2024 X Corp.",
  ];

  return (
    // <ScrollArea className="h-screen rounded-md border">
    <div className="w-96 min-h-screen flex-col gap-4  hidden lg:flex ">
      <div className=" sticky -top-1/2 max-w-[380px] w-full px-4">
        <div className="fixed w-[350px] bg-black py-2">
          <div className="bg-blue-0 sticky top-0">
            <div className="">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CustomIcon
                  iconName="ExploreIcon"
                  className="w-6 h-6 fill-[#4C5055]"
                />
              </div>
              <input
                placeholder="Search"
                className={`flex h-11 w-full rounded-full mai pl-12 text-white
             px-3 py-1 text-sm shadow-sm focus-visible:ring-1 transition-colors bg-main-search-background
              file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
              />
              {/* <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            /> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col  p-4 mt-16 rounded-xl bg-main-sidebar-background  ">
          <h1 className="text-[20px] leading-[20px] font-[901]  py-2 text-light-primary dark:text-dark-primary">
            Subscribe to Premium
          </h1>
          <p className="break-words inline-block text-sm">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button
            type="submit"
            className="rounded-full w-28 mt-3 cursor-pointer flex items-center justify-center bg-main-accent px-4 py-1.5 font-bold text-white hover:bg-main-accent/90 disabled:bg-main-accent/80 disabled:text-white/90 enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75"
          >
            Subscribe
          </button>
        </div>

        <div className="flex flex-col mt-4 rounded-xl bg-main-sidebar-background  ">
          <h1 className="text-[20px] leading-[20px] font-[901] p-4 py-5 text-light-primary dark:text-dark-primary">
            Trends for you
          </h1>

          <Trending />
        </div>

        <div className="flex flex-col  pt-3 mt-6 rounded-xl bg-main-sidebar-background  ">
          <h1 className="text-[20px] px-4 leading-[20px] font-[901]  py-2 text-light-primary dark:text-dark-primary">
            Who to follow
          </h1>
          <div className="h-full">
            {data?.map((item: any) => {
              return <UserCard user={item} />;
            })}
          </div>
          <p className="px-4 h-14 flex items-center text-main-accent cursor-pointer dark:hover:bg-dark-primary/10 hover:bg-light-primary/10 text-[15px] leading-[20px]">
            Show more
          </p>
        </div>
      </div>
    </div>
    // </ScrollArea>
  );
}
