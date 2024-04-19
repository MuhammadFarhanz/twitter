import { Aside } from "@/components/aside/aside";
import Layout from "@/components/layout/main-layout";
import { Sidebar } from "@/components/sidebar/sidebar";
import Profile from "../../../components/user/profile";
import { useRouter } from "next/router";
import { useGetReplies } from "@/api/useGetReplies";
import TweetCard from "@/components/tweet/tweet-card";
import { useGetUserByUsername } from "@/api/useGetUserByUsername";
import Image from "next/image";

export default function Media() {
  const router = useRouter();
  const { username } = router.query;
  const { data: user, isError, refetch } = useGetUserByUsername(username);

  return (
    <main className="bg-orange-400">
      <div className="flex w-full justify-center gap-0 lg:gap-4 bg-main-background">
        <Layout>
          <Profile
            username={username}
            user={user}
            isError={isError}
            refetch={refetch}
          >
            {user?.likedTweets.length == 0 && (
              <div className="items-center flex flex-col">
                <Image
                  src={"/assets/no-media.png"}
                  width={400}
                  height={200}
                  sizes="100vw"
                  priority
                  className="w-[400px] h-[200px] mt-4 object-cover bg-slate0"
                  alt="No bookmarks"
                />
                <div className="flex items-center justify-center flex-col">
                  <h1 className="font-black text-3xl mb-1">
                    Lights, camera ... <br />
                    attachments!
                  </h1>
                  <p className="text-dark-secondary  whitespace-pre-wrap break-words ">
                    When you post photos or videos, they will show up here.
                  </p>
                  {/* <p className="text-dark-secondary  whitespace-pre-wrap break-words ">
                    When you do, it'll show up here.
                  </p> */}
                </div>
              </div>
            )}
            {/* {user?.likedTweets?.map((tweetData: any) => (
              <TweetCard key={tweetData.id} data={tweetData.tweet} />
            ))} */}
          </Profile>
        </Layout>
      </div>
    </main>
  );
}
