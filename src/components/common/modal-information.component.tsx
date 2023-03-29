import clsx from "clsx";
import circleWarning from "../../assets/warning-circle.svg";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ModalInformation({ isOpen, onClose }: TProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={onClose}
        data-cy="modal-information"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-50"
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
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 -translate-y-3"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-100 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-3"
            >
              <Dialog.Panel
                className={clsx([
                  "w-full shadow-xl flex items-center h-[3.625rem]",
                  "max-w-[30.6rem] rounded-xl bg-white text-left transition-all",
                ])}
              >
                <div className="ml-[1.875rem] flex gap-x-[0.8125rem] items-center">
                  <img
                    src={circleWarning}
                    alt="circle-warning-icon"
                    data-cy="modal-information-icon"
                  />
                  <p
                    className="font-medium text-sm"
                    data-cy="modal-information-title"
                  >
                    Activity berhasil dihapus
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalInformation;
