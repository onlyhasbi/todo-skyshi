import { PRIORITY } from "../model/priority.model";

export function getValueTodo(selected: string, selectedValue: string) {
  return PRIORITY?.filter((priority) => priority.value === selectedValue)[0][
    selected
  ];
}
