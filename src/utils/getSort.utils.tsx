const sort = {
  new: (a: TTodos, b: TTodos) => {
    if (a.id - b.id) return -1;
  },
  old: (a: TTodos, b: TTodos) => {
    if (b.id - a.id) return 1;
  },
  az: (a: TTodos, b: TTodos) => {
    let first = a.title.toLowerCase();
    let second = b.title.toLowerCase();
    if (second < first) {
      return 1;
    }
  },
  za: (a: TTodos, b: TTodos) => {
    let first = a.title.toLowerCase();
    let second = b.title.toLowerCase();
    if (first < second) {
      return -1;
    }
  },
  unchecked: (a: TTodos, b: TTodos) => b.is_active === 1,
};

function getSort(by: string, values: any) {
  let todos = values ? values.todo_items : [];
  return todos.slice().sort(sort[by]);
}

export default getSort;
