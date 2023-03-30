import TodoService from "../../../service/todo.service";
import Checked from "../../common/checked.component";
import clsx from "clsx";
import trash from "../../../assets/delete.svg";
import pencil from "../../../assets/pencil.svg";
import emptyTodo from "../../../assets/todo-empty-state.svg";
import { lazy, memo, Suspense, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getValueTodo } from "../../../utils/getValueTodo.utils";
import { useParams } from "react-router-dom";
import { useTodoStore } from "../../../store/todo";
import { getSort } from "../../../utils/sort.utils";
const EmptyActivity = lazy(
  () => import("../../common/empty-activity.component")
);
const DialogModal = lazy(() => import("../../element/dialog.component"));

declare global {
  type TTodo = {
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
  const setDeleteData = useTodoStore((state) => state.setDeleteData);
  const [updateData, setUpdateData] = useState<TUpdateData | boolean>(false);

  const { queryGetTodos } = TodoService();
  const { data: response, isSuccess } = useQuery(queryGetTodos(Number(id)));
  const todos: TTodo[] = response?.todo_items || [];

  const sortTodos = useMemo(() => {
    return getSort(sort, todos);
  }, [todos, sort]);

  if (isSuccess && sortTodos.length === 0) {
    return <EmptyActivity src={emptyTodo} section="todo" />;
  }

  return (
    <>
      <ul className="space-y-[0.625rem] pb-[14.875rem]">
        {sortTodos.map(({ id, title, is_active, priority }: TTodo) => {
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
                    setUpdateData({ id, todo: title, priority });
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
                }}
                data-cy="todo-item-delete-button"
              />
            </li>
          );
        })}
      </ul>
      <Suspense>
        <DialogModal
          isOpen={Boolean(updateData)}
          onClose={() => setUpdateData(false)}
          initialValue={updateData as TUpdateData}
        />
      </Suspense>
    </>
  );
}

export default memo(ListTodo);
