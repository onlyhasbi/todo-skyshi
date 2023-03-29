import checkIcon from "../../assets/check.svg";
import closeIcon from "../../assets/close.svg";
import chevronIcon from "../../assets/chevron.svg";
import TodoService from "../../service/todo.service";
import Button from "../common/button.component";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getValueTodo } from "../../utils/getValueTodo.utils";
import { PRIORITY } from "../../model/priority.model";

declare global {
  type TTodoProps = {
    id: number;
    todo: string;
    priority: string;
  };
}

type TProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValue?: TTodoProps;
};

type TPriorityProps = {
  label: string;
  value: string;
  color: React.ReactElement;
};

const defaultValues = {
  todo: "",
  priority: "very-high",
};

function DialogModal({ isOpen, setIsOpen, initialValue }: TProps) {
  const {
    control,
    register,
    watch,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues });
  const [selected, setSelected] = useState<string>("very-high");
  const { id } = useParams();

  function closeModal() {
    setIsOpen(false);
  }

  const { queryPostTodo, queryUpdateTodo } = TodoService();
  const { mutate: addTodo } = useMutation(queryPostTodo);
  const { mutate: updateTodo } = useMutation(queryUpdateTodo);

  const onSubmit = (data: any) => {
    if (!initialValue) {
      const defaultAddData = {
        activity_group_id: Number(id),
        title: data.todo,
        priority: data.priority,
        _comment: "something",
      };
      addTodo(defaultAddData);
    } else {
      const defaultUpdateData = {
        id: Number(initialValue.id),
        todo: data.todo,
        priority: data.priority,
      };
      updateTodo(defaultUpdateData);
      setIsOpen(false);
    }
    setSelected("very-high");
  };

  useEffect(() => {
    if (initialValue) {
      setValue("todo", initialValue.todo);
      setValue("priority", initialValue.priority);
      setSelected(initialValue.priority);
    }
  }, [initialValue]);

  useEffect(() => {
    let delayFocused: any;
    if (isSubmitSuccessful) {
      reset();
      delayFocused = setTimeout(() => {
        setFocus("todo", { shouldSelect: true });
      }, 1);
    }
    return () => {
      clearTimeout(delayFocused);
    };
  }, [isSubmitSuccessful]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-1"
        open={isOpen}
        onClose={closeModal}
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 -translate-y-3"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-3"
          >
            <Dialog.Panel className="w-full max-w-[51.875rem] min-h-[25.188rem] rounded-xl bg-white text-left shadow-xl transform">
              <Dialog.Title
                as="div"
                className="flex justify-between items-center pt-[1.5rem] pl-[1.875rem] pb-[1.188rem] pr-[2.938rem]"
              >
                <span className="block text-lg font-semibold leading-[1.688rem] text-generalblack">
                  Tambah List Item
                </span>
                <span>
                  <img
                    onClick={closeModal}
                    className="w-[0.75rem] h-[0.75rem] cursor-pointer"
                    src={closeIcon}
                    alt="close-icon"
                  />
                </span>
              </Dialog.Title>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-[1.625rem] border border-t-[#E5E5E5] boder-b-[#E5E5E5] pt-[2.375rem] pb-[1.438rem]">
                  <div className="space-y-[0.563rem] mx-[1.75rem]">
                    <label className="block font-semibold w-full text-xs leading-[1.125rem] text-generalblack">
                      NAMA LIST ITEM
                    </label>
                    <input
                      className="w-full font-normal placeholder:text-generalsecondary rounded-[0.375rem] py-[0.875rem] px-[1.125rem] border border-[#E5E5E5] focus:border-transparent"
                      type="text"
                      placeholder="Tambahkan nama list item"
                      {...register("todo")}
                    />
                  </div>
                  <div className="space-y-[0.563rem] mx-[1.75rem]">
                    <label className=" block font-semibold w-full text-xs leading-[1.125rem] text-generalblack">
                      PRIORITY
                    </label>

                    <Controller
                      control={control}
                      name="priority"
                      render={({ field: { onChange } }) => {
                        return (
                          <Listbox
                            value={getValueTodo("value", selected)}
                            onChange={(e) => {
                              onChange(e);
                              setSelected(e);
                            }}
                          >
                            {({ open }) => (
                              <>
                                <div className={`relative`}>
                                  <Listbox.Button className="flex items-center w-[12.813rem] cursor-pointer font-normal placeholder:text-generalsecondary rounded-[0.375rem] py-[0.875rem] px-[1.125rem] border border-[#E5E5E5] active:border-blue-600">
                                    {!open ? (
                                      <>
                                        {getValueTodo("color", selected)}
                                        <span className="block text-left truncate ml-[1.188rem] mr-auto text-generalblack">
                                          {getValueTodo("label", selected)}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="block text-left truncate mr-auto text-generalblack">
                                        Pilih Priority
                                      </span>
                                    )}
                                    <img
                                      src={chevronIcon}
                                      className={`block h-[0.375rem] w-[0.75rem] transition-all duration-150 ease-linear ${
                                        !open ? "rotate-180" : ""
                                      }`}
                                      aria-hidden="true"
                                      alt="chevron"
                                    />
                                  </Listbox.Button>

                                  <Transition
                                    as={Fragment}
                                    enter="transition ease duration-150 transform"
                                    enterFrom="opacity-0 -translate-y-1"
                                    enterTo=" translate-y-0"
                                    leave="transition ease duration-100 transform"
                                    leaveFrom=" translate-y-0"
                                    leaveTo="opacity-0 -translate-y-1"
                                  >
                                    <Listbox.Options className="absolute w-[12.813rem] overflow-hidden rounded-md bg-white shadow-lg">
                                      {PRIORITY.map(
                                        (
                                          {
                                            label,
                                            value,
                                            color,
                                          }: TPriorityProps,
                                          index
                                        ) => (
                                          <Listbox.Option
                                            key={index}
                                            className={`py-[0.875rem] border-b text-generalsecondary cursor-pointer hover:bg-sky-100`}
                                            value={value}
                                          >
                                            {({ selected }) => (
                                              <>
                                                <div className="flex items-center ml-[1.063rem] mr-[1.625rem]">
                                                  <span className="w-[0.875rem] h-[0.875rem]">
                                                    {color}
                                                  </span>
                                                  <span
                                                    className={`block truncate ml-[1.188rem] mr-auto`}
                                                  >
                                                    {label}
                                                  </span>
                                                  {selected ? (
                                                    <img
                                                      src={checkIcon}
                                                      className="block h-[0.469rem] w-[0.703rem]"
                                                      aria-hidden="true"
                                                      alt="check-icon"
                                                    />
                                                  ) : null}
                                                </div>
                                              </>
                                            )}
                                          </Listbox.Option>
                                        )
                                      )}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </>
                            )}
                          </Listbox>
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="pt-[0.938rem] pb-[1.188rem] flex justify-end">
                  <Button
                    className="bg-primary text-right mr-[2.5rem]"
                    disabled={!Boolean(watch("todo"))}
                  >
                    {initialValue ? "Simpan" : "Tambah"}
                  </Button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DialogModal;
