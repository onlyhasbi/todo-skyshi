import dayjs from "dayjs";
import Card from "../../common/card.component";
import Button from "../../common/button.component";
import Modal from "../../common/modal.component";
import ActivityService from "../../../service/activity.service";
import trash from "../../../assets/delete.svg";
import warningIcon from "../../../assets/warning.svg";
import emptyState from "../../../assets/activity-empty-state.svg";
import { useNavigate } from "react-router-dom";
import { memo, Suspense, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import EmptyActivity from "../../common/empty-activity.component";
import { useTodoStore } from "../../../store/todo";

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

function ListActivity() {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<TDeleteData>({
    id: -1,
    activity: "",
  });
  const navigate = useNavigate();

  const setIsDeletedSuccess = useTodoStore(
    (state) => state.setIsDeletedSuccess
  );

  const { queryGetActivities } = ActivityService();
  const { data: response, isLoading } = useQuery(queryGetActivities);
  const activities = response?.data ? response.data : [];

  const { queryDeleteActivity } = ActivityService();
  const { mutate: deleteActivity } = useMutation(queryDeleteActivity);

  const handleDetailActivity = (id: number, title: string) => {
    navigate(`/detail/${id}`, { state: { title } });
  };

  const handleCloseModal = () => {
    setIsDelete(false);
  };

  if (isLoading) return <Suspense></Suspense>;

  if (activities.length > 0)
    return (
      <>
        <Suspense fallback="Getting Activity...">
          <div
            className="flex gap-x-[1.25rem] gap-y-[1.625rem] flex-wrap pb-[17.063rem]"
            data-cy="activity-item"
          >
            {activities.map((activity: TActivity) => {
              const { id, title, created_at } = activity;
              return (
                <Card
                  className="flex flex-col justify-between py-[1.375rem] px-[1.688rem] hover:cursor-pointer"
                  key={id}
                >
                  <div
                    onClick={() => handleDetailActivity(id, title)}
                    className="h-full"
                  >
                    <h3
                      className="text-lg font-bold text-generalblack"
                      data-cy="activity-item-title"
                    >
                      {title}
                    </h3>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className="text-generalgray font-medium text-sm"
                      data-cy="activity-item-date"
                    >
                      {dayjs(created_at).format("D MMMM YYYY")}
                    </span>
                    <button
                      onClick={() => {
                        setDeleteData((prev: TDeleteData) => ({
                          ...prev,
                          id,
                          activity: title,
                        }));
                        setIsDelete(true);
                      }}
                      data-cy="activity-item-delete-button"
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
        </Suspense>

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
              data-cy="modal-delete-icon"
            />
            <p
              className="text-lg font-medium text-center"
              data-cy="modal-delete-title"
            >
              Apakah anda yakin menghapus activity
              <br />
              <span className="font-bold">{`"${deleteData.activity}"?`}</span>
            </p>
            <div className="flex gap-x-[1.25rem] justify-center mt-[2.875rem]">
              <Button
                className="w-[9.375rem] bg-[#F4F4F4]"
                textStyle="mx-auto text-generalsecondary"
                onClick={handleCloseModal}
                data-cy="modal-delete-cancel-icon"
              >
                Batal
              </Button>
              <Button
                className="w-[9.375rem] bg-[#ED4C5C]"
                textStyle="mx-auto"
                onClick={() => {
                  deleteActivity(deleteData.id);
                  handleCloseModal();
                  setIsDeletedSuccess(true);
                }}
                data-cy="modal-delete-confirm-button"
              >
                Hapus
              </Button>
            </div>
          </>
        </Modal>
      </>
    );

  return <EmptyActivity src={emptyState} />;
}

export default memo(ListActivity);
