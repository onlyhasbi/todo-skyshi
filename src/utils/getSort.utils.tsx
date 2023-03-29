function getSort(sort: string, values: any) {
  let todos = values ? values.todo_items : [];
  return todos.slice().sort((a: TTodos, b: TTodos) => {
    if (sort === "new") return a.id < b.id;
    if (sort === "old") return a.id > b.id;
    if (sort === "az") return a.title.toLowerCase() > b.title.toLowerCase();
    if (sort === "za") return a.title.toLowerCase() < b.title.toLowerCase();
    if (sort === "unchecked") return b.is_active === 1
    return todos;
  });
}

export default getSort;
