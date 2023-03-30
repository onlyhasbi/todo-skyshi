import dayjs from "dayjs";
import Card from "../../common/card.component";
import trash from "../../../assets/delete.svg";
import emptyState from "../../../assets/activity-empty-state.svg";
import EmptyActivity from "../../common/empty-activity.component";
import ActivityService from "../../../service/activity.service";
import { useNavigate } from "react-router-dom";
import { memo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTodoStore } from "../../../store/todo";

declare global {
  type TActivity = {
    id: number;
    title: string;
    created_at: string;
  };
}

function ListActivity() {
  const navigate = useNavigate();
  const setIsDelete = useTodoStore((state) => state.setIsDelete);
  const setDeleteData = useTodoStore((state) => state.setDeleteData);

  const { queryGetActivities } = ActivityService();
  const { data: activities, isSuccess } = useQuery(queryGetActivities);

  const handleDetailActivity = (id: number, title: string) => {
    navigate(`/detail/${id}`, { state: { title } });
  };

  if (isSuccess) {
    if (activities?.data.length > 0) {
      return (
        <Suspense>
          <div className="flex gap-x-[1.25rem] gap-y-[1.625rem] flex-wrap pb-[17.063rem]">
            {activities.data.map((activity: TActivity) => {
              const { id, title, created_at } = activity;
              return (
                <Card
                  className="flex flex-col justify-between py-[1.375rem] px-[1.688rem] hover:cursor-pointer"
                  key={id}
                >
                  <div
                    onClick={() => handleDetailActivity(id, title)}
                    className="h-full"
                    data-cy="activity-item"
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
                        setDeleteData({ id, title, section: "activity" });
                        setIsDelete(true);
                      }}
                      data-cy="activity-item-delete-button"
                    >
                      <img
                        loading="lazy"
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
      );
    } else {
      return <EmptyActivity src={emptyState} />;
    }
  }

  return <></>;
}

export default memo(ListActivity);
