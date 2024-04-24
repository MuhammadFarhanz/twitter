import Layout from "@/components/layout/main-layout";
import Profile from "../../../components/user/profile";
import { useRouter } from "next/router";
import TweetCard from "@/components/tweet/tweet-card";
import { useGetUserByUsername } from "@/api/useGetUserByUsername";
import Image from "next/image";
import useUserStore from "@/lib/store/user-store";

export default function Likes() {
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
            {user?.likedTweets.length == 0 && (
              <div className="items-center flex flex-col">
                <Image
                  src={"/assets/no-likes.png"}
                  width={400}
                  height={200}
                  sizes="100vw"
                  priority
                  className="w-[400px] h-[200px] mt-4 object-cover bg-slate0"
                  alt="No bookmarks"
                />
                <div className="flex items-center justify-center flex-col">
                  <h1 className="font-black text-2xl sm:text-3xl mb-1">
                    You don't have any likes yet
                  </h1>
                  <p className="text-dark-secondary  whitespace-pre-wrap break-words ">
                    Tap the heart on any Tweet to show it some love.
                  </p>
                  <p className="text-dark-secondary  whitespace-pre-wrap break-words ">
                    When you do, it'll show up here.
                  </p>
                </div>
              </div>
            )}
            {user?.likedTweets?.map((tweetData: any) => (
              <TweetCard key={tweetData.id} data={tweetData.tweet} />
            ))}
          </Profile>
        </Layout>
      </div>
    </main>
  );
}
