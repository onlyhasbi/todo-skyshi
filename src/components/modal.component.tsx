import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";

type TProps = {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, className, onClose, children }: TProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-50"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="overflow-auto fixed top-0 left-0 w-full h-full z-1 bg-black/25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel
            className={clsx([
              "fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full shadow-xl",
              "max-w-[30.6rem] rounded-xl bg-white text-left align-middle",
              className
            ])}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default Modal;
