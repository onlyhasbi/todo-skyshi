declare global {
  type TPostActivity = {
    title: string;
    email: string;
    _comment: string;
  };

  type TChangeTitle = {
    id: string;
    title: string;
  };

  type TPostTodo = {
    activity_group_id: number;
    title: any;
    priority: any;
    _comment: string;
  };

  type TUpdateTodo = {
    id: number;
    todo: string;
    priority: string;
  };

  type TChangeActive = {
    id: number;
    active: number;
  };
}

export {};
