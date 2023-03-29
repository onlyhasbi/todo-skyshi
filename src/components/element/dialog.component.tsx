import checkIcon from "../../assets/check.svg?inline";
import closeIcon from "../../assets/close.svg?inline";
import chevronIcon from "../../assets/chevron.svg?inline";
import TodoService from "../../service/todo.service";
import Button from "../common/button.component";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import { Fragment, memo, useEffect, useState } from "react";
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
      setSelected("very-high");
    } else {
      const defaultUpdateData = {
        id: Number(initialValue.id),
        todo: data.todo,
        priority: data.priority,
      };
      updateTodo(defaultUpdateData);
      setIsOpen(false);
    }
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
    <Dialog
      as="div"
      className="relative z-1"
      open={isOpen}
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
        <Dialog.Panel
          data-cy="modal-add"
          className="w-full max-w-[51.875rem] min-h-[25.188rem] rounded-xl bg-white text-left shadow-xl transform"
        >
          <Dialog.Title
            as="div"
            className="flex justify-between items-center pt-[1.5rem] pl-[1.875rem] pb-[1.188rem] pr-[2.938rem]"
          >
            <span
              className="block text-lg font-semibold leading-[1.688rem] text-generalblack"
              data-cy="modal-add-title"
            >
              Tambah List Item
            </span>
            <span>
              <img
                loading="lazy"
                onClick={closeModal}
                className="w-[0.75rem] h-[0.75rem] cursor-pointer"
                src={closeIcon}
                alt="close-icon"
                data-cy="modal-add-close-button"
              />
            </span>
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-[1.625rem] border border-t-[#E5E5E5] boder-b-[#E5E5E5] pt-[2.375rem] pb-[1.438rem]">
              <div className="space-y-[0.563rem] mx-[1.75rem]">
                <label
                  data-cy="modal-add-name-title"
                  className="block font-semibold w-full text-xs leading-[1.125rem] text-generalblack"
                >
                  NAMA LIST ITEM
                </label>
                <input
                  className="w-full font-normal placeholder:text-generalsecondary rounded-[0.375rem] py-[0.875rem] px-[1.125rem] border border-[#E5E5E5] focus:border-transparent"
                  type="text"
                  placeholder="Tambahkan nama list item"
                  data-cy="modal-add-name-input"
                  {...register("todo")}
                />
              </div>
              <div className="space-y-[0.563rem] mx-[1.75rem]">
                <label
                  data-cy="modal-add-priority-title"
                  className=" block font-semibold w-full text-xs leading-[1.125rem] text-generalblack"
                >
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
                              <Listbox.Button
                                data-cy="modal-add-priority-dropdown"
                                className="flex items-center w-[12.813rem] cursor-pointer font-normal placeholder:text-generalsecondary rounded-[0.375rem] py-[0.875rem] px-[1.125rem] border border-[#E5E5E5] active:border-blue-600"
                              >
                                {!open ? (
                                  <>
                                    {getValueTodo("color", selected)}
                                    <p className="text-left truncate ml-[1.188rem] text-generalblack">
                                      {getValueTodo("label", selected)}
                                    </p>
                                  </>
                                ) : (
                                  <p className="text-left truncate text-generalblack">
                                    Pilih Priority
                                  </p>
                                )}
                                <img
                                  loading="lazy"
                                  src={chevronIcon}
                                  className={`block h-[0.375rem] w-[0.75rem] ml-auto transition-all duration-300 ease-linear ${
                                    !open ? "rotate-180" : ""
                                  }`}
                                  aria-hidden="true"
                                  alt="chevron"
                                />
                              </Listbox.Button>
                              <Listbox.Options className="absolute w-[12.813rem] overflow-hidden rounded-md bg-white shadow-lg">
                                {PRIORITY.map(
                                  (
                                    { label, value, color }: TPriorityProps,
                                    index
                                  ) => (
                                    <Listbox.Option
                                      key={index}
                                      data-cy="modal-add-priority-item"
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
                                                loading="lazy"
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
                data-cy="modal-add-save-button"
              >
                {initialValue ? "Simpan" : "Tambah"}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default memo(DialogModal);
