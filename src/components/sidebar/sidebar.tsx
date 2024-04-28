import { CustomIcon } from "../ui/custom-icon";
import { SidebarLink } from "./sidebar-link";
import useWindow from "@/lib/hooks/window-context";
import SidebarProfile from "./sidebar-profile";
import MoreSettings from "./more-settings";
import Tweetdialog from "../tweet/tweet-dialog";
import { useGetUser } from "@/lib/hooks/useGetUser";

export type NavLink = {
  href?: string;
  linkName: string;
  iconName: any;
  disabled?: boolean;
  canBeHidden?: boolean;
};

export function Sidebar(): JSX.Element {
  const { isMobile } = useWindow();

  const { data: currentUser } = useGetUser();

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
      href: `/${currentUser?.username}`,
      linkName: "Profile",
      iconName: "ProfileIcon",
      // disabled: true,
      canBeHidden: true,
    },
  ];

  return (
    <header className="flex font-twitter-chirp shrink-0 transition-opacity duration-200 xs:w-20 md:w-24 lg:max-w-none xl:w-full xl:max-w-xs xl:justify-end">
      <div
        className="fixed bottom-0 z-10 flex w-full flex-col justify-between border-t 
      border-light-border bg-main-background py-0 dark:border-dark-border xs:top-0 xs:h-full xs:w-auto
       xs:border-0 xs:bg-transparent xs:px-2 xs:py-3 xs:pt-2 md:px-4 xl:w-72"
      >
        <section className="flex dark:text-dark-primary text-light-primary flex-col justify-center gap-2 xs:items-center xl:items-stretch">
          <h1 className="hidden xs:flex">
            <a
              className="custom-button main-tab rounded-full p-3 text-accent-blue transition hover:bg-light-primary/10
                         focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80
                         dark:text-twitter-icon dark:hover:bg-dark-primary/10"
            >
              <CustomIcon className="h-7 w-7" iconName="TwitterIcon" />
            </a>
          </h1>

          <nav className="flex items-center justify-around xs:flex-col xs:justify-center xl:block">
            {navLinks.map(({ ...linkData }) => (
              <SidebarLink {...linkData} key={linkData.href} />
            ))}

            <MoreSettings />
          </nav>

          <Tweetdialog />
        </section>
        {!isMobile && <SidebarProfile />}
      </div>
    </header>
  );
}
