import plus from "../../../assets/plus.svg";
import ActivityService from "../../../service/activity.service";
import Button from "../../common/button.component";
import Wrapper from "../../layout/wrapper.component";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, lazy, Suspense } from "react";
const ListActivity = lazy(() => import("./list-activity.component"));

function MainActivity() {
  const { queryPostActivity } = ActivityService();
  const queryClient = useQueryClient();

  const { mutate: addActivity } = useMutation(queryPostActivity);
  const handleAddActivity = () => {
    addActivity();
  };

  useEffect(() => {
    if (queryClient.getQueryData(["Todos"], { exact: false })) {
      queryClient.removeQueries(["Todos"]);
    }
  }, []);

  return (
    <Suspense>
      <Wrapper>
        <section className="flex justify-between py-[3.063rem]">
          <span
            className="text-4xl font-bold text-generalblack"
            data-cy="activity-title"
          >
            Activity
          </span>
          <Button
            className="bg-primary"
            data-cy="activity-add-button"
            icon={plus}
            onClick={handleAddActivity}
          >
            Tambah
          </Button>
        </section>
        <ListActivity />
      </Wrapper>
    </Suspense>
  );
}

export default MainActivity;
