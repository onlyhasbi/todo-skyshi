import { URL } from "./url.service";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

type TFetchTodo = {
  activity_group_id: number;
  title: string;
  _comment: string;
};

type TChangeActive = {
  id: number;
  active: number;
};

type TUpdateTodo = {
  id: number;
  todo: string;
  priority: string;
};

function TodoService() {
  const queryClient = useQueryClient();

  return {
    queryPostTodo: {
      mutationKey: ["AddTodo"],
      mutationFn: (data: TFetchTodo) => {
        return axios.post<TFetchTodo>(URL.TODO, data).then(({ data }) => data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["DetailActivity"]);
      },
    },
    queryDeleteTodo: {
      mutationKey: ["DeleteTodo"],
      mutationFn: (id: number) => {
        return axios.delete(`${URL.TODO}/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["DetailActivity"]);
      },
    },
    queryChangeActive: {
      mutationKey: ["ChangeTodoActive"],
      mutationFn: ({ id, active }: TChangeActive) => {
        return axios.patch(`${URL.TODO}/${id}`, { is_active: active });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["DetailActivity"]);
      },
    },
    queryUpdateTodo: {
      mutationKey: ["UpdateTodo"],
      mutationFn: ({ id, todo, priority }: TUpdateTodo) => {
        return axios.patch(`${URL.TODO}/${id}`, { title:todo,priority });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["DetailActivity"]);
      },
    },
  };
}

export default TodoService;
