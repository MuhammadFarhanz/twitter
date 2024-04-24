import { TweetFormFeed } from "./tweet-form-feed";
import FeedHeader from "./feed-header";
import FeedWrapper from "./feed-wrapper";
import MultistepForm from "../login/multistep-form";
import { useDialogStore } from "@/lib/store/dialog";
import useWindow from "@/lib/hooks/window-context";
import FeedHeaderMobile from "./feed-header-mobile";
import Timeline from "./feed-timeline";

export function Feed(): JSX.Element {
  const { isDialogOpen } = useDialogStore();
  const { isMobile } = useWindow();

  return (
    <FeedWrapper>
      {isMobile && <FeedHeaderMobile />}
      <FeedHeader />
      {!isMobile && <TweetFormFeed />}
      <Timeline />
      <MultistepForm isOpen={isDialogOpen} />
    </FeedWrapper>
  );
}
