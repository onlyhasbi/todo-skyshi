import dayjs from "dayjs";
import ActivityService from "../../../service/activity.service";
import EmptyActivity from "../../common/empty-activity.component";
import Card from "../../common/card.component";
import Modal from "../../common/modal.component";
import Button from "../../common/button.component";
import trash from "../assets/delete.svg";
import emptyState from "../../../assets/activity-empty-state.svg";
import warningIcon from "../../../assets/warning.svg";
import circleWarning from "../../../assets/warning-circle.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

declare global {
  type TActivity = {
    id: number;
    title: string;
    created_at: string;
  };
}

type TDeleteData = {
  id: number;
  activity: string;
};

type TProps = {
  activities: TActivity[] | undefined;
};

function Activity({ activities }: TProps) {
  const navigate = useNavigate();
  const [deleteData, setDeleteData] = useState<TDeleteData>({
    id: -1,
    activity: "",
  });
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
  const { queryDeleteActivity } = ActivityService();
  const { mutate: deleteActivity } = useMutation(queryDeleteActivity);

  if (activities?.length === 0) {
    return <EmptyActivity src={emptyState} />;
  }

  const handleCloseModal = () => {
    setIsDelete(false);
  };

  const handleDetailActivity = (id: number) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <div className="flex gap-x-[1.25rem] gap-y-[1.625rem] flex-wrap pb-[17.063rem]">
        {activities?.map((activity: TActivity) => {
          const { id, title, created_at } = activity;
          return (
            <Card
              className="flex flex-col justify-between py-[1.375rem] px-[1.688rem] hover:cursor-pointer"
              key={id}
            >
              <div onClick={() => handleDetailActivity(id)} className="h-full">
                <h3 className="text-lg font-bold text-generalblack">{title}</h3>
              </div>
              <div className="flex justify-between">
                <span className="text-generalgray font-medium text-sm">
                  {dayjs(created_at).format("D MMMM YYYY")}
                </span>
                <button
                  onClick={() => {
                    setDeleteData((prev) => ({ ...prev, id, activity: title }));
                    setIsDelete(true);
                  }}
                >
                  <img
                    className="block w-[16px] h-[18px] hover:cursor-pointer"
                    src={trash}
                    alt="delete-icon"
                  />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

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
            <span className="font-bold">{`"${deleteData.activity}"?`}</span>
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
                deleteActivity(deleteData.id);
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

export default Activity;
