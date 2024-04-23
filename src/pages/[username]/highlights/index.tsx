import { Aside } from "@/components/aside/aside";
import Layout from "@/components/layout/main-layout";
import { Sidebar } from "@/components/sidebar/sidebar";
import Profile from "../../../components/user/profile";
import { useRouter } from "next/router";
import { useGetReplies } from "@/api/useGetReplies";
import TweetCard from "@/components/tweet/tweet-card";
import { useGetUserByUsername } from "@/api/useGetUserByUsername";
import Image from "next/image";
import useUserStore from "@/lib/store/user-store";

export default function Highlights() {
  const router = useRouter();
  const { username } = router.query;

  const { data: user, isError, refetch } = useGetUserByUsername(username);
  const { setIsFollowing, isFollowing } = useUserStore();

  return (
    <main className="bg-orange-400">
      <div className="flex w-full justify-center gap-0 lg:gap-4 bg-main-background">
        <Layout>
          <Profile
            username={username}
            user={user}
            isError={isError}
            refetch={refetch}
            setIsFollowing={setIsFollowing}
            isFollowing={isFollowing}
          >
            <div className="bg-main-background"></div>
          </Profile>
        </Layout>
      </div>
    </main>
  );
}
