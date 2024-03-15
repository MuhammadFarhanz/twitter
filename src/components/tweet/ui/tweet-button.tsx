import React from "react";

export default function TweetButton() {
  return (
    <button
      type="submit"
      className=" rounded-full custom-button main-tab accent-tab bg-main-accent px-4 py-1.5 font-bold text-white enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75"
    >
      tweet
    </button>
  );
}
