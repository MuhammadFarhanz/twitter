import { create } from "zustand";

interface UserStore {
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
  //   refetch: () => void;
  //   setRefetch: (refetchFn: () => void) => void; // New setter for refetch
  //   isError: boolean;
  //   setIsError: (value: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
  isFollowing: false,
  setIsFollowing: (value) => set({ isFollowing: value }),
  //   refetch: () => {},
  //   isError: false,
  //   setIsError: (value) => set({ isError: value }),
  //   setRefetch: (refetchFn) => set({ refetch: refetchFn }), //
}));

export default useUserStore;
