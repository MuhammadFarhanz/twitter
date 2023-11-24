import Link from "next/link";
import { CustomIcon } from "../ui/custom-icon";
import { SidebarLink } from "./sidebar-link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useResponsive from "@/lib/hooks/useResponsive";
import useWindow from "@/lib/hooks/window-context";
import SidebarProfile from "./sidebar-profile";
import MoreSettings from "./more-settings";

export type NavLink = {
  href: string;
  linkName: string;
  iconName: any;
  disabled?: boolean;
  canBeHidden?: boolean;
};
const navLinks: Readonly<NavLink[]> = [
  {
    href: "/home",
    linkName: "Home",
    iconName: "HomeIcon",
  },
  {
    href: "/explore",
    linkName: "Explore",
    iconName: "ExploreIcon",
    disabled: true,
    canBeHidden: true,
  },
  {
    href: "/notifications",
    linkName: "Notifications",
    iconName: "NotificationIcon",
    disabled: true,
  },
  {
    href: "/messages",
    linkName: "Messages",
    iconName: "EnvelopeIcon",
    disabled: true,
  },
  {
    href: "/lists",
    linkName: "List",
    iconName: "ListIcon",
    disabled: true,
    canBeHidden: true,
  },
  {
    href: "/bookmarks",
    linkName: "Bookmarks",
    iconName: "BookmarkIcon",
    canBeHidden: true,
  },
  {
    href: "/communities",
    linkName: "Communities",
    iconName: "CommunitiesIcon",
    disabled: true,
    canBeHidden: true,
  },
  {
    href: "/premium",
    linkName: "Premium",
    iconName: "PremiumIcon",
    disabled: true,
    canBeHidden: true,
  },
  {
    href: "/more",
    linkName: "Profile",
    iconName: "ProfileIcon",
    disabled: true,
    canBeHidden: true,
  },
];

export function Sidebar(): JSX.Element {
  const { isMobile } = useWindow();

  return (
    <header className="flex font-twitter-chirp w-0 shrink-0 transition-opacity duration-200 xs:w-20 md:w-24 lg:max-w-none xl:-mr-4 xl:w-full xl:max-w-xs xl:justify-end">
      <div
        className="fixed bottom-0 z-10 flex w-full flex-col justify-between border-t 
      border-light-border bg-main-background py-0 dark:border-dark-border xs:top-0 xs:h-full xs:w-auto
       xs:border-0 xs:bg-transparent xs:px-2 xs:py-3 xs:pt-2 md:px-4 xl:w-72"
      >
        <section className="flex text-white flex-col justify-center gap-2 xs:items-center xl:items-stretch">
          <h1 className="hidden xs:flex">
            <a
              className="custom-button main-tab rounded-full p-3 text-accent-blue transition hover:bg-light-primary/10
                           focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80
                           dark:text-twitter-icon dark:hover:bg-dark-primary/10"
            >
              <CustomIcon className="h-7 w-7" iconName="TwitterIcon" />
            </a>
          </h1>

          <nav className="flex items-center justify-around xs:flex-col xs:justify-center xl:block ">
            {navLinks.map(({ ...linkData }) => (
              <SidebarLink {...linkData} key={linkData.href} />
            ))}

            <MoreSettings />
          </nav>

          <button className="custom-button rounded-full p-3  main-tab accent-tab absolute right-4 -translate-y-[72px] bg-main-accent text-lg font-bold text-white outline-none transition hover:brightness-90 active:brightness-75 xs:static xs:translate-y-0 xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75 xl:w-11/12">
            <CustomIcon
              className="block h-6 w-6 xl:hidden"
              iconName="FeatherIcon"
            />
            <p className="hidden xl:block">Tweet</p>
          </button>
        </section>
        {!isMobile && <SidebarProfile />}
      </div>
    </header>
  );
}
