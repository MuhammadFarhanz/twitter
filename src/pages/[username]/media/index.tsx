import Layout from "@/components/layout/main-layout";
import Profile from "../../../components/user/profile";
import { useRouter } from "next/router";
import { useGetUserByUsername } from "@/lib/hooks/useGetUserByUsername";
import Image from "next/image";
import useUserStore from "@/lib/store/user-store";

export default function Media() {
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
                <h1 className="font-black text-2xl sm:text-3xl mb-1">
                  Lights, camera ... <br />
                  attachments!
                </h1>
                <p className="text-dark-secondary  whitespace-pre-wrap break-words ">
                  When you post photos or videos, they will show up here.
                </p>
              </div>
            </div>
          </Profile>
        </Layout>
      </div>
    </main>
  );
}
