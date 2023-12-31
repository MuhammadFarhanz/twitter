import { useGetTweet } from "@/api/useGetTweet";
import TweetCard from "../tweet/tweet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CustomIcon } from "../ui/custom-icon";

export const svg = [
  {
    iconName: "MediaIcon",
  },
  {
    iconName: "GifIcon",
  },
  {
    iconName: "PollIcon",
  },
  {
    iconName: "EmojiIcon",
  },
  {
    iconName: "ScheduleIcon",
  },
  {
    iconName: "LocationIcon",
  },
];

export function Main(): JSX.Element {
  const { data } = useGetTweet();
  // type Svg = {
  //   iconName: any;
  // };

  console.log(data?.data.map((data: any) => console.log(data)));

  return (
    <main
      className="hover-animation flex min-h-screen w-full max-w-[600px] flex-col border-x-0
       border-light-border dark:border-dark-border pb-96  xs:border-x "
    >
      <header className="flex h-14 text-light-primary dark:text-dark-primary border-b font-bold border-light-border dark:border-dark-border">
        <button className=" w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 ">
          For you
        </button>
        <button className="w-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 ">
          Following
        </button>
        <div className=" w-32 flex items-center justify-center">
          <CustomIcon
            iconName="SettingsIcon"
            className="fill-light-primary dark:fill-dark-primary h-6 w-6"
          />
        </div>
      </header>

      <form className="bg-main-background flex flex-col ">
        <label className="hover-animation grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3 border-b border-light-border dark:border-dark-border">
          <a className="blur-picture flex self-start">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </a>
          <div className="flex w-full flex-col gap-4">
            <div className="flex min-h-[48px] w-full flex-col justify-center gap-4 ">
              <div className="flex items-center gap-3">
                <textarea
                  className="w-full min-w-0 resize-none bg-transparent text-xl outline-none placeholder:text-light-secondary dark:placeholder:text-dark-secondary"
                  placeholder="What's Happening?"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-between ">
              <div className="flex items-center justify-center text-main-accent xs:[&>button:nth-child(n+6)]:hidden md:[&>button]:!block [&>button:nth-child(n+4)]:hidden">
                {svg.map(({ ...data }) => (
                  <CustomIcon
                    iconName={data.iconName as any}
                    className="mr-3 h-5 w-5 fill-main-accent"
                  />
                ))}
              </div>
              <div className="flex items-center gap-4"></div>
              <button
                disabled={true}
                className=" rounded-full custom-button main-tab accent-tab bg-main-accent px-4 py-1.5 font-bold text-white enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75"
              >
                tweet
              </button>
            </div>
          </div>
        </label>
      </form>
      {data?.data.map((tweetData: any) => (
        <TweetCard key={tweetData.id} data={tweetData} />
      ))}
    </main>
  );
}
