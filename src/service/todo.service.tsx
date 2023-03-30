import { URL } from "./url.service";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

declare global {
  type TFetchTodos = {
    id: number;
    title: string;
    created_at: string;
    todo_items: [];
  };
}

function TodoService() {
  const queryClient = useQueryClient();

  return {
    queryGetTodos: (id: number) => ({
      queryKey: ["Todos"],
      queryFn: () => {
        return axios
          .get<TFetchTodos>(`${URL.ACTIVITY}/${id}`)
          .then(({ data }) => data);
      },
    }),
    queryPostTodo: {
      mutationKey: ["AddTodo"],
      mutationFn: (data: TFetchTodo) => {
        return axios.post<TFetchTodo>(URL.TODO, data).then(({ data }) => data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Todos"]);
      },
    },
    queryDeleteTodo: {
      mutationKey: ["DeleteTodo"],
      mutationFn: (id: number) => {
        return axios.delete(`${URL.TODO}/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Todos"]);
      },
    },
    queryChangeActive: {
      mutationKey: ["ChangeTodoActive"],
      mutationFn: ({ id, active }: TChangeActive) => {
        return axios.patch(`${URL.TODO}/${id}`, { is_active: active });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Todos"]);
      },
    },
    queryUpdateTodo: {
      mutationKey: ["UpdateTodo"],
      mutationFn: ({ id, todo, priority }: TUpdateTodo) => {
        return axios.patch(`${URL.TODO}/${id}`, { title: todo, priority });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["Todos"]);
      },
    },
  };
}

export default TodoService;
