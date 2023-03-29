import { create } from "zustand";

type TTodosState = {
  isDeletedSuccess: boolean;
  setIsDeletedSuccess: (newValue: boolean) => void;
  sort: string;
  setSort: (newValue: string) => void;
};

export const useTodoStore = create<TTodosState>((set) => ({
  isDeletedSuccess: false,
  setIsDeletedSuccess: (newValue) => set({ isDeletedSuccess: newValue }),
  sort: "new",
  setSort: (newValue) => set({ sort: newValue }),
}));
