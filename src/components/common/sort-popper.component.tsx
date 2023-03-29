import checked from "../../assets/check.svg?inline";
import { SORT } from "../../model/sort.model";
import { useState } from "react";
import { useTodoStore } from "../../store/todo";

function SortPopper() {
  const setSort = useTodoStore((state) => state.setSort);
  const [selected, setSelected] = useState<string>("new");

  const handleSelected = (label: string) => {
    setSelected(label);
  };

  return (
    <ul className="w-[14.688rem] bg-white shadow-lg rounded-xl border divide-y">
      {SORT.map(({ label, icon, value }) => {
        return (
          <li
            key={label}
            onClick={() => {
              handleSelected(value);
              setSort(value);
            }}
            className="h-[3.25rem] flex items-center px-[1.5rem] cursor-pointer"
            data-cy="sort-selection"
          >
            <img
              loading="lazy"
              className="block mr-[1.078rem] cursor-pointer"
              src={icon}
              alt="icon-sort"
              data-cy="sort-selection-icon"
            />
            <label
              className="text-generalsecondary mr-auto cursor-pointer"
              data-cy="sort-selection-title"
            >
              {label}
            </label>
            {selected === value && <img src={checked} alt="selected-icon" />}
          </li>
        );
      })}
    </ul>
  );
}

export default SortPopper;
