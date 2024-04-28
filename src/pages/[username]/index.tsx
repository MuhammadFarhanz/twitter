import Layout from "@/components/layout/main-layout";
import Profile from "../../components/user/profile";
import { useRouter } from "next/router";
import { useGetUserByUsername } from "@/lib/hooks/useGetUserByUsername";
import { useGetUser } from "@/lib/hooks/useGetUser";
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
              <div className="flex items-center mt-6 justify-center flex-col">
                <h1 className="font-black text-2xl sm:text-3xl mb-1">
                  @{user?.username} hasn't tweeted
                </h1>

                <p className="text-dark-secondary  whitespace-pre-wrap break-words ">
                  When they do, their Tweets will show up here.
                </p>
              </div>
            </div>
          )}
        </Profile>
      </Layout>
    </div>
  );
}
