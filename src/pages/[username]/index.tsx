import { Aside } from "@/components/aside/aside";
import Layout from "@/components/layout/main-layout";
import { Sidebar } from "@/components/sidebar/sidebar";
import Profile from "../../components/user/profile";
import { useRouter } from "next/router";

export default function Profiles() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="flex w-full justify-center gap-0 lg:gap-4 bg-main-background">
      <Layout>
        <Profile username={username} />
      </Layout>
    </div>
  );
}
