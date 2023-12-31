import { Aside } from "@/components/aside/aside";
import { Main } from "@/components/home/main";
import Layout from "@/components/layout/main-layout";
import { Sidebar } from "@/components/sidebar/sidebar";
import Profile from "./profile";

export default function Profiles() {
  return (
    <div className="flex w-full justify-center gap-0 lg:gap-4 bg-main-background">
      <Layout>
        <Profile />
      </Layout>
    </div>
  );
}
