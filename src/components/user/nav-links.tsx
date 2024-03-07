import { useGetUser } from "@/api/useGetUser";
import { useGetUserById } from "@/api/useGetUserById";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function NavLink({ name, path }: any) {
  const userPath = path ? `/user/${path}` : "/user";

  return (
    <Link
      href={userPath}
      className={`flex-1 text-light-secondary dark:text-dark-secondary text-center hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 h-full w-full items-center flex justify-center cursor-pointer`}
    >
      {name}
      <i className="h-1 scale-50 rounded-full bg-main-accent opacity-0 transition duration-200" />
    </Link>
  );
}

export default NavLink;
