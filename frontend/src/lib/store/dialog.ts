import { create } from "zustand";

interface DialogState {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isDialogOpen: false,
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
}));
