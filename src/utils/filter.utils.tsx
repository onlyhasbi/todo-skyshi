export function getSort(by: string, values: any) {
  const todos = values ? values.todo_items : [];

  switch (by) {
    case "new":
      return todos.slice().sort((a: TTodos, b: TTodos) => {
        if (a.id - b.id) return -1;
      });
    case "old":
      return todos.slice().sort((a: TTodos, b: TTodos) => {
        if (b.id - a.id) return 1;
      });
    case "az":
      return todos.slice().sort((a: TTodos, b: TTodos) => {
        return a.title.localeCompare(b.title);
      });
    case "za":
      return todos
        .slice()
        .sort((a: TTodos, b: TTodos) => {
          return a.title.localeCompare(b.title);
        })
        .reverse();
    case "unchecked":
      return todos.slice().sort((a: TTodos, b: TTodos) => b.is_active === 1);
    default:
      return todos;
  }
}
