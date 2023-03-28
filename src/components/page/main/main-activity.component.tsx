import emptyState from "../../../assets/activity-empty-state.svg";
import plus from "../../../assets/plus.svg";
import ActivityService from "../../../service/activity.service";
import Wrapper from "../../common/wrapper.component";
import Button from "../../common/button.component";
import EmptyActivity from "../../common/empty-activity.component";
import ListActivity from "./list-activity.component";
import { useMutation, useQuery } from "@tanstack/react-query";

declare global {
  type TActivity = {
    id: number;
    title: string;
    created_at: string;
  };
}

function MainActivity() {
  const { queryGetActivities, queryPostActivity } = ActivityService();
  const { data: response, isLoading } = useQuery(queryGetActivities);
  const { mutate: addActivity } = useMutation(queryPostActivity);
  const handleAddActivity = () => {
    addActivity();
  };

  const activities = response?.data ? response.data : [];

  return (
    <Wrapper>
      <section className="flex justify-between py-[3.063rem]">
        <span className="text-4xl font-bold text-generalblack">Activity</span>
        <Button className="bg-primary" icon={plus} onClick={handleAddActivity}>
          Tambah
        </Button>
      </section>
      {isLoading ? (
        <>Loading...</>
      ) : activities.length > 0 ? (
        <ListActivity activities={activities} />
      ) : (
        <EmptyActivity src={emptyState} />
      )}
    </Wrapper>
  );
}

export default MainActivity;
