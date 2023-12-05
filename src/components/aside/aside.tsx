import { CustomIcon } from "../ui/custom-icon";
import { Input } from "../ui/input";
import Trending from "./trends";

export function Aside(): JSX.Element {
  return (
    <div className="w-96 flex-col gap-4 py-3 pt-1 bg-main-background hidden lg:flex relative">
      <div className="py-2 fixed max-w-[384px] w-full px-4">
        {/* <Input className="bg-[#16181C] border-none h-11 rounded-full" /> */}
        <div className="">
          <div className="relative">
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
        <div className="flex flex-col h-full mt-4 rounded-xl bg-main-sidebar-background  ">
          <h1 className="text-2xl font-bold mb-2 p-4 text-light-primary dark:text-dark-primary">
            Trends for you
          </h1>

          <Trending />
        </div>
      </div>
    </div>
  );
}
