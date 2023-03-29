import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type TProps = {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, className, onClose, children }: TProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={onClose}
        data-cy="modal-delete"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 w-full h-full z-1 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-300 transform"
              enterFrom="opacity-0 -translate-y-3"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-3"
            >
              <Dialog.Panel
                className={clsx([
                  "w-full shadow-xl",
                  "max-w-[30.6rem] rounded-xl bg-white text-left transition-all",
                  className,
                ])}
                data-cy="todo-modal-delete"
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
