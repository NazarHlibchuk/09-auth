// store/draftStore.ts
import { create } from "zustand";

interface DraftState {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  resetDraft: () => void;
}

export const useDraftStore = create<DraftState>((set) => ({
  title: "",
  content: "",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  resetDraft: () => set({ title: "", content: "" }),
}));
