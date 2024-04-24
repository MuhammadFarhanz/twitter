import Layout from "@/components/layout/main-layout";
import Profile from "../../../components/user/profile";
import { useRouter } from "next/router";
import TweetCard from "@/components/tweet/tweet-card";
import { useGetUserByUsername } from "@/api/useGetUserByUsername";
import useUserStore from "@/lib/store/user-store";

export default function Replies() {
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
            {user?.replies?.map((item: any) => (
              <div key={item.id}>
                {item.parent && (
                  <>
                    <TweetCard
                      key={item.parent.id}
                      data={item.parent}
                      isRelate={true}
                    />
                  </>
                )}
                <div>
                  <TweetCard key={item.id} data={item} />
                </div>
              </div>
            ))}
          </Profile>
        </Layout>
      </div>
    </main>
  );
}
