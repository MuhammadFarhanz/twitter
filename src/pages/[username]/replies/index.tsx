import { Aside } from "@/components/aside/aside";
import Layout from "@/components/layout/main-layout";
import { Sidebar } from "@/components/sidebar/sidebar";
import Profile from "../../../components/user/profile";
import { useRouter } from "next/router";

export default function Replies() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <main className="bg-orange-400">
      <div className="flex w-full justify-center gap-0 lg:gap-4 bg-main-background">
        <Layout>
          <Profile username={username}>
            <p>replies ini woiiiii pliss</p>
          </Profile>
        </Layout>
      </div>
    </main>
  );
}
