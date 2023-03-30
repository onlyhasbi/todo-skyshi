import clsx from "clsx";
import warningIcon from "../../assets/warning.svg";
import ActivityService from "../../service/activity.service";
import TodoService from "../../service/todo.service";
import Button from "../common/button.component";
import { useMutation } from "@tanstack/react-query";
import { Dialog } from "@headlessui/react";
import { useTodoStore } from "../../store/todo";

type TProps = {
  isOpen: boolean;
  data?: TDeleteData;
  onClose: () => void;
};

function ModalDelete({ isOpen, onClose, data }: TProps) {
  const { queryDeleteActivity } = ActivityService();
  const { mutate: deleteActivity } = useMutation(queryDeleteActivity);

  const { queryDeleteTodo } = TodoService();
  const { mutate: deleteTodo } = useMutation(queryDeleteTodo);

  const setIsDeletedSuccess = useTodoStore(
    (state) => state.setIsDeletedSuccess
  );

  const handleDelete = () => {
    if (data?.section === "activity") {
      deleteActivity(data?.id);
    }

    if (data?.section === "list item") {
      deleteTodo(data?.id);
    }

    setIsDeletedSuccess(true);
    onClose();
  };

  return (
    <Dialog
      as="div"
      className="relative z-10"
      open={isOpen}
      onClose={onClose}
      data-cy="modal-delete"
    >
      <Dialog.Overlay className="fixed inset-0 w-full h-full z-1 bg-black/25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel
            className={clsx([
              "w-full shadow-xl",
              "max-w-[30.6rem] rounded-xl bg-white text-left transition-all",
              "min-h-[22rem] flex flex-col items-center",
            ])}
            data-cy="todo-modal-delete"
          >
            <>
              <img
                loading="lazy"
                className="block w-[3.9rem] h-[3.5rem] mt-[3.15rem] mb-[3.2rem]"
                src={warningIcon}
                alt="warning-icon"
                data-cy="modal-delete-icon"
              />
              <p
                className="text-lg font-medium text-center"
                data-cy="modal-delete-title"
              >
                {`Apakah anda yakin menghapus ${data?.section}`}
                <br />
                <span className="font-bold">{`"${data?.title}"?`}</span>
              </p>
              <div className="flex gap-x-[1.25rem] justify-center mt-[2.875rem]">
                <Button
                  className="w-[9.375rem] bg-[#F4F4F4]"
                  textStyle="mx-auto text-generalsecondary"
                  onClick={onClose}
                  data-cy="modal-delete-cancel-button"
                >
                  Batal
                </Button>
                <Button
                  className="w-[9.375rem] bg-[#ED4C5C]"
                  textStyle="mx-auto"
                  onClick={handleDelete}
                  data-cy="modal-delete-confirm-button"
                >
                  Hapus
                </Button>
              </div>
            </>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalDelete;
