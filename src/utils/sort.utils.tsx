export function getSort(by: string, todos: TTodo[]) {
  switch (by) {
    case "new":
      return [...todos].sort((a: TTodo, b: TTodo) => b.id - a.id);
    case "old":
      return [...todos].sort((a: TTodo, b: TTodo) => a.id - b.id);
    case "az":
      return [...todos].sort((a: TTodo, b: TTodo) =>
        a.title.localeCompare(b.title)
      );
    case "za":
      return [...todos]
        .sort((a: TTodo, b: TTodo) => a.title.localeCompare(b.title))
        .reverse();
    case "unchecked":
      return [...todos].sort((a: TTodo, b: TTodo) => b.is_active - a.is_active);
    default:
      return todos;
  }
}
