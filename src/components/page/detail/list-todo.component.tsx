import DialogModal from "../../element/dialog.component";
import TodoService from "../../../service/todo.service";
import Checked from "../../common/checked.component";
import EmptyActivity from "../../common/empty-activity.component";
import clsx from "clsx";
import trash from "../../../assets/delete.svg";
import pencil from "../../../assets/pencil.svg";
import emptyTodo from "../../../assets/todo-empty-state.svg";
import { memo, Suspense, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getValueTodo } from "../../../utils/getValueTodo.utils";
import { useParams } from "react-router-dom";
import { useTodoStore } from "../../../store/todo";

declare global {
  type TTodos = {
    id: number;
    title: string;
    activity_group_id: number;
    is_active: number;
    priority: string;
  };
}

type TDeleteData = {
  id: number;
  todo: string;
};

function ListTodo() {
  const { id } = useParams();
  const sort = useTodoStore((state) => state.sort);

  const setIsDelete = useTodoStore((state) => state.setIsDelete);
  const setDeleteData = useTodoStore((state) => state.setDeleteData);

  const [updateData, setUpdateData] = useState<TTodoProps>({
    id: -1,
    todo: "",
    priority: "",
  });

  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);

  const { queryGetTodos } = TodoService();
  const { data: response, isLoading } = useQuery(queryGetTodos(Number(id)));

  const todos = getSort(sort, response);

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  if (isLoading) return <Suspense></Suspense>;

  if (todos.length > 0)
    return (
      <>
        <Suspense fallback="Getting todos...">
          <ul className="space-y-[0.625rem] pb-[14.875rem]">
            {todos.map(({ id, title, is_active, priority }: TTodos) => {
              return (
                <li
                  key={id}
                  className={clsx([
                    "flex items-center justify-between w-full h-[5rem]",
                    "bg-white rounded-xl shadow-xl px-[1.75rem]",
                  ])}
                >
                  <div className="flex items-center">
                    <Checked
                      id={id}
                      active={is_active}
                      color={getValueTodo("color", priority)}
                      label={title}
                    />
                    <img
                      className="block cursor-pointer ml-[1.208rem]"
                      onClick={() => {
                        setUpdateData((prev) => ({
                          ...prev,
                          id,
                          todo: title,
                          priority,
                        }));
                        handleOpenUpdateDialog();
                      }}
                      src={pencil}
                      alt="pencil-icon"
                      data-cy="todo-item-edit-button"
                    />
                  </div>
                  <img
                    className="block w-[16px] h-[18px] hover:cursor-pointer"
                    src={trash}
                    alt="delete-icon"
                    onClick={() => {
                      setDeleteData({ id, title, section: "list item" });
                      setIsDelete(true);
                    }}
                    data-cy="todo-item-delete-button"
                  />
                </li>
              );
            })}
          </ul>
        </Suspense>

        <DialogModal
          isOpen={openUpdateDialog}
          initialValue={updateData}
          setIsOpen={setOpenUpdateDialog}
        />
      </>
    );

  return <EmptyActivity src={emptyTodo} />;
}

const sort = {
  new: (a: TTodos, b: TTodos) => {
    if (a.id - b.id) return -1;
  },
  old: (a: TTodos, b: TTodos) => {
    if (b.id - a.id) return 1;
  },
  az: (a: TTodos, b: TTodos) => {
    let first = a.title.toLowerCase();
    let second = b.title.toLowerCase();
    if (second < first) {
      return 1;
    }
  },
  za: (a: TTodos, b: TTodos) => {
    let first = a.title.toLowerCase();
    let second = b.title.toLowerCase();
    if (first < second) {
      return -1;
    }
  },
  unchecked: (a: TTodos, b: TTodos) => b.is_active === 1,
};

function getSort(by: string, values: any) {
  let todos = values ? values.todo_items : [];
  return [...todos].sort(sort[by]);
}

export default memo(ListTodo);
