import React from "react";

export default function FeedWrapper({ children }: any) {
  return (
    <main
      className="hover-animation flex min-h-screen w-full max-w-[600px] flex-col border-x-0
     border-light-border dark:border-dark-border pb-96  xs:border-x "
    >
      {children}
    </main>
  );
}
