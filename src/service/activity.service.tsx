import { URL } from "./url.service";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

type TFetchActivity = {
  total: number;
  limit: number;
  skip: number;
  data: TActivity[];
};

type TTodo = {
  id: number;
  title: string;
  activity_group_id: number;
  is_active: number;
  priority: string;
};

type TPatch = {
  id: string;
  title: string;
};

declare global {
  type TFetchDetailActivity = {
    id: number;
    title: string;
    created_at: string;
    todo_items: TTodo[];
  };
}

function ActivityService() {
  const queryClient = useQueryClient();

  return {
    queryGetActivities: {
      queryKey: ["Activity"],
      queryFn: () => {
        return axios
          .get<TFetchActivity>(`${URL.ACTIVITY}/?email=yoga%2B1%40skyshi.io`)
          .then(({ data }) => data);
      },
    },
    queryPostActivity: {
      mutationKey: ["AddActivity"],
      mutationFn: () => {
        return axios
          .post<TFetchActivity>(URL.ACTIVITY, {
            title: "New Activity",
            email: "yoga+1@skyshi.io",
            _comment:
              "email digunakan untuk membedakan list data yang digunakan antar aplikasi",
          })
          .then(({ data }) => data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Activity"]);
      },
    },
    queryDeleteActivity: {
      mutationKey: ["DeleteActivity"],
      mutationFn: (id: number) => {
        return axios.delete(`${URL.ACTIVITY}/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Activity"]);
      },
    },
    queryGetDetailActivities: (id: string | undefined) => ({
      queryKey: ["DetailActivity"],
      queryFn: () => {
        if (!id) return undefined;
        return axios
          .get<TFetchDetailActivity>(`${URL.ACTIVITY}/${id}`)
          .then(({ data }) => data);
      },
    }),
    queryChangeTitle: {
      mutationKey: ["ChangeTitle"],
      mutationFn: ({ id, title }: TPatch) => {
        return axios.patch(`${URL.ACTIVITY}/${id}`, { title });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Activity"]);
      },
    },
  };
}

export default ActivityService;
