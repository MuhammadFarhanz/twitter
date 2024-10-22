import { Aside } from "@/components/aside/aside";
import { Feed } from "@/components/home/feed";
import Layout from "@/components/layout/main-layout";
import { Sidebar } from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <Layout>
      <Feed />
    </Layout>
  );
}
