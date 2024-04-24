import { create, SetState } from "zustand";

interface TweetState {
  isLiked: boolean;
  isReplyDialogOpen: boolean;
  isRetweeted: boolean;
  isBookmarked: boolean;
  tweetId: number;
  imageDialogOpen: boolean;
  selectedImageId: number | null;
}

interface TweetActions extends TweetState {
  setLiked: (value: boolean) => void;
  setReplyDialogOpen: (value: boolean) => void;
  setRetweeted: (value: boolean) => void;
  setBookmarked: (value: boolean) => void;
  setTweetId: (value: number) => void;
  setImageDialogOpen: (value: boolean) => void;
  setSelectedImageId: (value: number | null) => void;
}

const useTweetStore = create<TweetActions>((set: SetState<TweetState>) => ({
  isLiked: false,
  isReplyDialogOpen: false,
  isRetweeted: false,
  isBookmarked: false,
  tweetId: 0,
  imageDialogOpen: false,
  selectedImageId: null,
  setLiked: (value) => set({ isLiked: value }),
  setReplyDialogOpen: (value) => set({ isReplyDialogOpen: value }),
  setRetweeted: (value) => set({ isRetweeted: value }),
  setBookmarked: (value) => set({ isBookmarked: value }),
  setTweetId: (value) => set({ tweetId: value }),
  setImageDialogOpen: (value) => set({ imageDialogOpen: value }),
  setSelectedImageId: (value) => set({ selectedImageId: value }),
}));

export default useTweetStore;
