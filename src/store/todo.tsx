import { create } from "zustand";

declare global {
  type TDeleteData = {
    id: number;
    title: string;
    section: string;
  };
}

type TTodosState = {
  isDeletedSuccess: boolean;
  setIsDeletedSuccess: (newValue: boolean) => void;

  deleteData: TDeleteData | boolean;
  setDeleteData: (newValue: TDeleteData | boolean) => void;

  sort: string;
  setSort: (newValue: string) => void;
};

export const useTodoStore = create<TTodosState>((set) => ({
  isDeletedSuccess: false,
  setIsDeletedSuccess: (newValue) => set({ isDeletedSuccess: newValue }),

  deleteData: false,
  setDeleteData: (newValue) => set({ deleteData: newValue }),

  sort: "new",
  setSort: (newValue) => set({ sort: newValue }),
}));
