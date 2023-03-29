import TodoService from "../../../service/todo.service";
import Checked from "../../common/checked.component";
import EmptyActivity from "../../common/empty-activity.component";
import clsx from "clsx";
import trash from "../../../assets/delete.svg?inline";
import pencil from "../../../assets/pencil.svg?inline";
import emptyTodo from "../../../assets/todo-empty-state.svg?inline";
import { lazy, memo, Suspense, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getValueTodo } from "../../../utils/getValueTodo.utils";
import { useParams } from "react-router-dom";
import { useTodoStore } from "../../../store/todo";
import { getSort } from "../../../utils/sort.utils";
const DialogModal = lazy(() => import("../../element/dialog.component"));

declare global {
  type TTodos = {
    id: number;
    title: string;
    activity_group_id: number;
    is_active: number;
    priority: string;
  };
}

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
  const { data: response, isSuccess } = useQuery(queryGetTodos(Number(id)));

  const todos = useMemo(() => {
    if (isSuccess) {
      return getSort(sort, response);
    }
  }, [response, sort]);

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  if (todos.length > 0) {
    return (
      <>
        <Suspense>
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
                      loading="lazy"
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
                    loading="lazy"
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
  } else {
    return <EmptyActivity src={emptyTodo} />;
  }
}

export default memo(ListTodo);
