export function getSort(by: string, values: any) {
  const todos = values ? values.todo_items : [];

  switch (by) {
    case "new":
      return [...todos].sort((a: TTodos, b: TTodos) => b.id - a.id);
    case "old":
      return [...todos].sort((a: TTodos, b: TTodos) => a.id - b.id);
    case "az":
      return [...todos].sort((a: TTodos, b: TTodos) =>
        a.title.localeCompare(b.title)
      );
    case "za":
      return [...todos]
        .sort((a: TTodos, b: TTodos) => a.title.localeCompare(b.title))
        .reverse();
    case "unchecked":
      return [...todos].sort(
        (a: TTodos, b: TTodos) => b.is_active - a.is_active
      );
    default:
      return todos;
  }
}
