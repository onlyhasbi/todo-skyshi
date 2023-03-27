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
import { useNavigate, useParams } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



function DetailActivity() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [title, setTitle] = useState<string>("");
  const { queryGetDetailActivities, queryChangeTitle } = ActivityService();
  const { data: response, isSuccess } = useQuery(queryGetDetailActivities(id));
  const { mutate: changeTitle } = useMutation(queryChangeTitle);
  const { register, setFocus, setValue, getValues } = useForm();

  useEffect(() => {
    if (response) {
      setValue("title", response.title);
      setTitle(() => response.title);
    }
  }, [response]);

  useEffect(() => {
    if (isEditTitle) setFocus("title");
  }, [isEditTitle]);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleEditTitle = () => {
    if (isEditTitle) {
      setIsEditTitle(() => false);
      if (getValues("title") === title) return;
      if (id) changeTitle({ id, title: getValues("title") });
      setTitle(() => getValues("title"));
    } else {
      setIsEditTitle(() => true);
    }
  };

  const handlePreviousPage = () => {
    navigate(-1);
  };

  return (
    <Transition
      show={Boolean(isSuccess && response)}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-50"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Wrapper>
        <section className="flex justify-between py-[3.063rem]">
          <div className="w-7/12 flex items-center text-4xl font-bold text-generalblack">
            <img
              className="block cursor-pointer"
              onClick={handlePreviousPage}
              src={arrowBack}
              alt="arrow-back-icon"
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
                {...register("title")}
              />
            ) : (
              <label
                onClick={() => {
                  setIsEditTitle(() => true);
                }}
                className="ml-[36.33px] mr-[23px] text-4xl font-bold text-generalblack"
              >
                {title}
              </label>
            )}

            <button onClick={handleEditTitle}>
              <img
                className="block cursor-pointer"
                src={pencil}
                alt="pencil-icon"
              />
            </button>
          </div>

          <div className="flex items-center gap-x-[1.125rem]">
            <button
              className="w-[3.375rem] h-[3.375rem]"
              onClick={() => console.log("ok")}
            >
              <img src={sort} alt="sort-icon" />
            </button>
            <Button
              className="bg-primary"
              icon={plus}
              onClick={handleOpenAddDialog}
            >
              Tambah
            </Button>
          </div>
        </section>
        {<ListTodo data={response} />}
        <DialogModal isOpen={openAddDialog} setIsOpen={setOpenAddDialog} />
      </Wrapper>
    </Transition>
  );
}

export default DetailActivity;
