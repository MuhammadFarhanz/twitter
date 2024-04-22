import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function NavLink({ name, path, username }: any) {
  const userPath = username ? `/${username}/${path}` : `/${username}`;
  const router = useRouter();
  const isActive =
    router.asPath === userPath ||
    (path === "" && router.asPath === `/${username}`);

  return (
    <Link
      href={userPath}
      className={`flex-1 flex-col justify-center text-light-secondary dark:text-dark-secondary text-center hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 h-full w-full items-center flex cursor-pointer`}
    >
      <div className="h-full flex flex-col justify-between">
        <p className="mt-2">{name}</p>
        {isActive ? (
          <i className="h-1 w-full rounded-full bg-main-accent "></i>
        ) : null}
      </div>
    </Link>
  );
}

export default NavLink;
