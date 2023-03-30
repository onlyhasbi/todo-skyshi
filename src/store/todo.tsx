import { create } from "zustand";

declare global {
  type TDeleteData = {
    id: number;
    title: string;
    section: string;
  };

  type TUpdateData = {
    id: number;
    todo: string;
    priority: string;
  };
}

type TTodosState = {
  isDeletedSuccess: boolean;
  setIsDeletedSuccess: (newValue: boolean) => void;

  isDelete: boolean;
  setIsDelete: (newValue: boolean) => void;

  sort: string;
  setSort: (newValue: string) => void;

  updateData: TUpdateData | null;
  setUpdateData: (newValue: TUpdateData | null) => void;

  deleteData: TDeleteData;
  setDeleteData: (newValue: TDeleteData) => void;
};

export const useTodoStore = create<TTodosState>((set) => ({
  isDeletedSuccess: false,
  setIsDeletedSuccess: (newValue) => set({ isDeletedSuccess: newValue }),

  sort: "new",
  setSort: (newValue) => set({ sort: newValue }),

  isDelete: false,
  setIsDelete: (newValue) => set({ isDelete: newValue }),

  updateData: null,
  setUpdateData: (newValue) => set({ updateData: newValue }),

  deleteData: { id: -1, title: "", section: "" },
  setDeleteData: (newValue) => set({ deleteData: newValue }),
}));
