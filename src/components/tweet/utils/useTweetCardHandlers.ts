import { useBookmarkTweet } from "@/lib/hooks/useBookmarkTweet";
import { useLikeTweet } from "@/lib/hooks/useLikeTweet";
import { useRetweet } from "@/lib/hooks/useRetweet";
import { MouseEventHandler } from "react";

const useTweetCardHandlers = ({
  isLiked,
  isRetweeted,
  isBookmarked,
  _count,
  author,
  setLiked,
  setRetweeted,
  setBookmarked,
  setTweetId,
  setReplyDialogOpen,
  router,
}: any) => {
  const { mutateAsync: likeTweet } = useLikeTweet();
  const { mutateAsync: bookmarkTweet } = useBookmarkTweet();
  const { mutateAsync: retweet } = useRetweet();

  const handleReplyClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    tweetId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setTweetId(tweetId);
    setReplyDialogOpen((prev: any) => !prev);
  };

  const handleLikeClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    tweetId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    await likeTweet(tweetId);

    setLiked((prev: any) => !prev);
    _count.likedBy = isLiked ? _count?.likedBy - 1 : _count?.likedBy + 1;
  };

  const handleRetweet = async (
    e: React.MouseEvent<HTMLButtonElement>,
    tweetId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    await retweet(tweetId);

    setRetweeted((prev: any) => !prev);
    _count.retweetedBy = isRetweeted
      ? _count?.retweetedBy - 1
      : _count?.retweetedBy + 1;
  };

  const handleBookmark = async (
    e: React.MouseEvent<HTMLButtonElement>,
    tweetId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    await bookmarkTweet(tweetId);
    setBookmarked((prev: any) => !prev);
    _count.bookmarkedBy = isBookmarked
      ? _count?.bookmarkedBy - 1
      : _count?.bookmarkedBy + 1;
  };

  const handleAuthorClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(`/${author.username}`);
  };

  return {
    handleReplyClick,
    handleLikeClick,
    handleRetweet,
    handleBookmark,
    handleAuthorClick,
  };
};

export default useTweetCardHandlers;
