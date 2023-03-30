import clsx from "clsx";
import circleWarning from "../../assets/warning-circle.svg";
import { Dialog } from "@headlessui/react";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ModalInformation({ isOpen, onClose }: TProps) {
  return (
    <Dialog
      as="div"
      className="relative z-10"
      open={isOpen}
      onClose={onClose}
      data-cy="modal-information"
    >
      <Dialog.Overlay className="fixed inset-0 w-full h-full z-1 bg-black/25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel
            className={clsx([
              "w-full shadow-xl flex items-center h-[3.625rem]",
              "max-w-[30.6rem] rounded-xl bg-white text-left transition-all",
            ])}
          >
            <div className="ml-[1.875rem] flex gap-x-[0.8125rem] items-center">
              <img
                loading="lazy"
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
        </div>
      </div>
    </Dialog>
  );
}

export default ModalInformation;
