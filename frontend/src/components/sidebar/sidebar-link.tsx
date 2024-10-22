import { useRouter } from "next/router";
import Link from "next/link";
import cn from "clsx";
import type { NavLink } from "./sidebar";
import { CustomIcon } from "../ui/custom-icon";

type SidebarLinkProps = NavLink & {
  username?: string;
};

export function SidebarLink({
  href,
  username,
  iconName,
  linkName,
  disabled,
  canBeHidden,
}: SidebarLinkProps): JSX.Element {
  const { asPath } = useRouter();
  const isActive = username ? asPath.includes(username) : asPath === href;

  return (
    <>
      <button
        className={cn(
          "group  py-1 outline-none",
          canBeHidden ? "hidden xs:flex" : "flex"
          // disabled && "cursor-not-allowed"
        )}
      >
        <Link
          href={href as string}
          className={cn(
            `flex items-center justify-center gap-4 self-start p-2 text-xl transition 
               duration-200 group-hover:bg-light-primary/10 group-focus-visible:ring-2  rounded-full
               group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 
               dark:group-focus-visible:ring-white xs:p-3 xl:pr-5`,
            isActive && "font-bold",
            disabled && "pointer-events-none"
          )}
        >
          <CustomIcon
            iconName={isActive ? `Solid${iconName}` : iconName}
            className="w-7 h-7 fill-light-primary dark:fill-dark-primary"
          />
          <p className="hidden xl:block">{linkName}</p>
        </Link>
      </button>
    </>
  );
}
