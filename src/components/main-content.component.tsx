import plus from "../assets/plus.svg";
import ActivityService from "../service/activity.service";
import Activity from "./activity.component";
import Button from "./button.component";
import Wrapper from "./wrapper.component";
import sort from "../assets/sort.svg";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Transition } from "@headlessui/react";

function Content() {
  const { queryGetActivities, queryPostActivity } = ActivityService();
  const { data: response, isSuccess } = useQuery(queryGetActivities);
  const { mutate: addActivity } = useMutation(queryPostActivity);
  const handleAddActivity = () => {
    addActivity();
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
          <span className="text-4xl font-bold text-generalblack">Activity</span>
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
              onClick={handleAddActivity}
            >
              Tambah
            </Button>
          </div>
        </section>
        {<Activity activities={response?.data} />}
      </Wrapper>
    </Transition>
  );
}

export default Content;
