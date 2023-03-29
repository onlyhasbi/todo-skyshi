import Button from "../../common/button.component";
import ActivityService from "../../../service/activity.service";
import Wrapper from "../../common/wrapper.component";
import ListTodo from "./list-todo.component";
import DialogModal from "../../element/dialog.component";
import plus from "../../../assets/plus.svg";
import arrowBack from "../../../assets/arrow-back.svg";
import pencil from "../../../assets/pencil.svg";
import sort from "../../../assets/sort.svg";
import clsx from "clsx";
import SortPopper from "../../common/sort-popper.component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Popover, Transition } from "@headlessui/react";

function DetailActivity() {
  const navigate = useNavigate();
  const {
    state: { title: activityTitle },
  } = useLocation();
  const { id } = useParams();

  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState<string>("");

  const { queryChangeTitle } = ActivityService();
  const { mutate: changeTitle } = useMutation(queryChangeTitle);

  const { register, setFocus, setValue, getValues } = useForm();

  useEffect(() => {
    setValue("title", activityTitle);
    setTitle(activityTitle);
  }, []);

  useEffect(() => {
    if (isEditTitle) setFocus("title");
  }, [isEditTitle]);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleEditTitle = () => {
    if (isEditTitle) {
      setIsEditTitle(false);
      if (getValues("title") !== title && id)
        changeTitle({ id, title: getValues("title") });
      setTitle(getValues("title"));
    } else {
      setIsEditTitle(true);
    }
  };

  const handlePreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Wrapper>
        <section className="flex justify-between py-[3.063rem]">
          <div className="w-7/12 flex items-center text-4xl font-bold text-generalblack">
            <img
              className="block cursor-pointer"
              onClick={handlePreviousPage}
              src={arrowBack}
              alt="arrow-back-icon"
              data-cy="todo-back-button"
            />

            {isEditTitle ? (
              <input
                type="text"
                disabled={!isEditTitle}
                className={clsx([
                  "ml-[36.33px] mr-[23px] text-4xl font-bold text-generalblack",
                  "bg-transparent border-none outline-none ring-0 focus:ring-0 p-0",
                  {
                    "w-6/12 underline underline-offset-[.9rem]": isEditTitle,
                  },
                ])}
                data-cy="todo-title"
                {...register("title")}
              />
            ) : (
              <label
                onClick={() => {
                  setIsEditTitle(true);
                }}
                className="ml-[36.33px] mr-[23px] text-4xl font-bold text-generalblack"
                data-cy="todo-title"
              >
                {title}
              </label>
            )}

            <button onClick={handleEditTitle} data-cy="todo-title-edit-button">
              <img
                className="block cursor-pointer"
                src={pencil}
                alt="pencil-icon"
              />
            </button>
          </div>

          <div className="flex items-center gap-x-[1.125rem]">
            <Popover className="relative">
              <Popover.Button className="w-[3.375rem] h-[3.375rem]" data-cy="todo-sort-button">
                <>
                  <img src={sort} alt="sort-icon" />
                </>
              </Popover.Button>
              <Transition
                enter="transition ease-out duration-300 transform"
                enterFrom="opacity-0 -translate-y-3"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-3"
              >
                <Popover.Panel className="absolute top-3 -left-[6rem]">
                  <SortPopper />
                </Popover.Panel>
              </Transition>
            </Popover>

            <Button
              className="bg-primary"
              icon={plus}
              onClick={handleOpenAddDialog}
              data-cy="todo-add-button"
            >
              Tambah
            </Button>
          </div>
        </section>
        {<ListTodo />}
      </Wrapper>
      <DialogModal isOpen={openAddDialog} setIsOpen={setOpenAddDialog} />
    </>
  );
}

export default DetailActivity;
