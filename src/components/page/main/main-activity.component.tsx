import plus from "../../../assets/plus.svg";
import ActivityService from "../../../service/activity.service";
import Wrapper from "../../common/wrapper.component";
import Button from "../../common/button.component";
import ListActivity from "./list-activity.component";
import { useMutation } from "@tanstack/react-query";

function MainActivity() {
  const { queryPostActivity } = ActivityService();
  const { mutate: addActivity } = useMutation(queryPostActivity);
  const handleAddActivity = () => {
    addActivity();
  };

  return (
    <>
      <Wrapper>
        <section className="flex justify-between py-[3.063rem]">
          <span className="text-4xl font-bold text-generalblack">Activity</span>
          <Button
            className="bg-primary"
            icon={plus}
            onClick={handleAddActivity}
          >
            Tambah
          </Button>
        </section>

        <ListActivity />
      </Wrapper>
    </>
  );
}

export default MainActivity;
