// components/Layout.js

import React, { ReactNode } from "react";
import { Aside } from "../aside/aside";
import { Sidebar } from "../sidebar/sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className="flex w-full justify-center gap-0 lg:gap-4 bg-main-background">
      <Sidebar />
      {children}
      <Aside />
    </div>
  );
};

export default Layout;
