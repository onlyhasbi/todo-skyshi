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
import circleWarning from "../../../assets/warning-circle.svg";
import emptyTodo from "../../../assets/todo-empty-state.svg";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getValueTodo } from "../../../utils/getValueTodo.utils";

type TProps = {
  data: TFetchDetailActivity | undefined;
};

type TTodoItems = {
  id: number;
  title: string;
  activity_group_id: number;
  is_active: number;
  priority: string;
};

type TDeleteData = {
  id: number;
  todo: string;
};

function ListTodo({ data }: TProps) {
  if (data === undefined) {
    return null;
  }

  if (data && data.todo_items.length === 0) {
    return <EmptyActivity src={emptyTodo} />;
  }

  const [deleteData, setDeleteData] = useState<TDeleteData>({
    id: -1,
    todo: "",
  });

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsDelete(false);
  };

  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<TTodoProps>({
    id:-1,
    todo: "",
    priority: "",
  });

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const { queryDeleteTodo } = TodoService();
  const { mutate: deleteTodo } = useMutation(queryDeleteTodo);

  return (
    <>
      <ul className="space-y-[0.625rem] pb-[14.875rem]">
        {data.todo_items.map(
          ({ id, title, is_active, priority }: TTodoItems) => {
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
                  />
                </div>
                <img
                  className="block w-[16px] h-[18px] hover:cursor-pointer"
                  src={trash}
                  alt="delete-icon"
                  onClick={() => {
                    setDeleteData((prev) => ({ ...prev, id, todo: title }));
                    setIsDelete(true);
                  }}
                />
              </li>
            );
          }
        )}
      </ul>

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
          />
          <p className="text-lg font-medium text-center">
            Apakah anda yakin menghapus activity
            <br />
            <span className="font-bold">{`"${deleteData.todo}"?`}</span>
          </p>
          <div className="flex gap-x-[1.25rem] justify-center mt-[2.875rem]">
            <Button
              className="w-[9.375rem] bg-[#F4F4F4]"
              textStyle="mx-auto text-generalsecondary"
              onClick={handleCloseModal}
            >
              Batal
            </Button>
            <Button
              className="w-[9.375rem] bg-[#ED4C5C]"
              textStyle="mx-auto"
              onClick={() => {
                deleteTodo(deleteData.id);
                if (!isDeleteSuccess) setIsDeleteSuccess(true);
                handleCloseModal();
              }}
            >
              Hapus
            </Button>
          </div>
        </>
      </Modal>

      <Modal
        className="flex items-center h-[3.625rem]"
        isOpen={isDeleteSuccess}
        onClose={() => {
          if (isDeleteSuccess) setIsDeleteSuccess(false);
        }}
      >
        <div className="ml-[1.875rem] flex gap-x-[0.8125rem] items-center">
          <img src={circleWarning} alt="circle-warning-icon" />
          <p className="font-medium text-sm">Activity berhasil dihapus</p>
        </div>
      </Modal>
    </>
  );
}

export default ListTodo;
