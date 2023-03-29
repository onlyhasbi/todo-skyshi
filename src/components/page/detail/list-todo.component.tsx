import DialogModal from "../../element/dialog.component";
import TodoService from "../../../service/todo.service";
import Button from "../../common/button.component";
import Checked from "../../common/checked.component";
import Modal from "../../common/modal.component";
import EmptyActivity from "../../common/empty-activity.component";
import clsx from "clsx";
import trash from "../../../assets/delete.svg";
import pencil from "../../../assets/pencil.svg";
import warningIcon from "../../../assets/warning.svg";
import emptyTodo from "../../../assets/todo-empty-state.svg";
import getSort from "../../../utils/getSort.utils";
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

  const [deleteData, setDeleteData] = useState<TDeleteData>({
    id: -1,
    todo: "",
  });

  const [updateData, setUpdateData] = useState<TTodoProps>({
    id: -1,
    todo: "",
    priority: "",
  });

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);

  const { queryGetTodos } = TodoService();
  const { data: response, isLoading } = useQuery(queryGetTodos(Number(id)));
  const [todos, setTodos] = useState<TTodos[]>([]);

  useEffect(() => {
    setTodos(getSort(sort, response));
  }, [response, sort]);

  const { queryDeleteTodo } = TodoService();
  const { mutate: deleteTodo } = useMutation(queryDeleteTodo);

  const handleCloseModal = () => {
    setIsDelete(false);
  };

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
                      setDeleteData((prev) => ({
                        ...prev,
                        id,
                        todo: title,
                      }));
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

        <Modal
          className="min-h-[22rem] flex flex-col items-center"
          isOpen={isDelete}
          onClose={handleCloseModal}
        >
          <>
            <img
              className="block w-[3.9rem] h-[3.5rem] mt-[3.15rem] mb-[3.2rem]"
              src={warningIcon}
              alt="warning-icon"
              data-cy="modal-delete-icon"
            />
            <p
              className="text-lg font-medium text-center"
              data-cy="modal-delete-title"
            >
              Apakah anda yakin menghapus activity
              <br />
              <span className="font-bold">{`"${deleteData.todo}"?`}</span>
            </p>
            <div className="flex gap-x-[1.25rem] justify-center mt-[2.875rem]">
              <Button
                className="w-[9.375rem] bg-[#F4F4F4]"
                textStyle="mx-auto text-generalsecondary"
                onClick={handleCloseModal}
                data-cy="modal-delete-cancel-button"
              >
                Batal
              </Button>
              <Button
                className="w-[9.375rem] bg-[#ED4C5C]"
                textStyle="mx-auto"
                onClick={() => {
                  deleteTodo(deleteData.id);
                  handleCloseModal();
                }}
                data-cy="modal-delete-confirm-button"
              >
                Hapus
              </Button>
            </div>
          </>
        </Modal>
      </>
    );

  return <EmptyActivity src={emptyTodo} />;
}

export default memo(ListTodo);
