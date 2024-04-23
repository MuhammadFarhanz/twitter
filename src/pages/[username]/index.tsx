import Layout from "@/components/layout/main-layout";
import Profile from "../../components/user/profile";
import { useRouter } from "next/router";
import { useGetUserByUsername } from "@/api/useGetUserByUsername";
import { useGetUser } from "@/api/useGetUser";
import useUserStore from "@/lib/store/user-store";
import Image from "next/image";

export default function Profiles() {
  const router = useRouter();
  const { username } = router.query;
  const { data: currentUser } = useGetUser();
  const { data: user, isError, refetch } = useGetUserByUsername(username);
  const { setIsFollowing, isFollowing } = useUserStore();

  return (
    <div className="flex w-full justify-center gap-0 lg:gap-4 bg-main-background">
      <Layout>
        <Profile
          username={username}
          user={user}
          isError={isError}
          refetch={refetch}
          setIsFollowing={setIsFollowing}
          currentUser={currentUser}
          isFollowing={isFollowing}
        >
          {user?.tweets.length == 0 && (
            <div className="items-center flex flex-col">
              <Image
                src={"/assets/no-retweets.png"}
                width={400}
                height={200}
                sizes="100vw"
                priority
                className="w-[400px] h-[200px] mt-4 object-cover bg-slate0"
                alt="No bookmarks"
              />
              <div className="flex items-center justify-center flex-col">
                <h1 className="font-black text-3xl mb-1">
                  You don't have any tweet yet
                </h1>
                <p className="text-dark-secondary  whitespace-pre-wrap break-words ">
                  {/* Tap the heart on any Tweet to show it some love. */}
                </p>
                <p className="text-dark-secondary  whitespace-pre-wrap break-words ">
                  When you do, it'll show up here.
                </p>
              </div>
            </div>
          )}
        </Profile>
      </Layout>
    </div>
  );
}
