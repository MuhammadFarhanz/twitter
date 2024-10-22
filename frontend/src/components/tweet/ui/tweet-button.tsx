import clsx from "clsx";
import React from "react";

export default function TweetButton({ className, disable }: any) {
  return (
    <button
      type="submit"
      disabled={disable}
      className={clsx(
        "rounded-full cursor-pointer flex items-center justify-center bg-main-accent px-4 py-1.5 font-bold text-white hover:bg-main-accent/90 disabled:bg-main-accent/80 disabled:text-white/90 enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75",
        className
      )}
    >
      tweet
    </button>
  );
}
