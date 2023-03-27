import TodoService from "../../service/todo.service";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type TProps = {
  id: number;
  active: number;
  color: React.ReactElement;
  label: string;
};

function Checked(props: TProps) {
  const { id, active, color, label } = props;
  const [isChecked, setIsChecked] = useState<boolean>(!Boolean(active));
  const { queryChangeActive } = TodoService();
  const { mutate: changeActive } = useMutation(queryChangeActive);

  const handleChangeActive = () => {
    setIsChecked(!isChecked);
    changeActive({ id, active: Number(isChecked) });
  };

  return (
    <>
      <input
        checked={isChecked}
        onChange={handleChangeActive}
        className={clsx([
          "bg-white w-[1.5rem] h-[1.5rem] border-[#C7C7C7]",
          "checked:bg-primary hover:checked:bg-primary focus:checked:bg-primary",
          "focus:ring-0 checked:border-transparent appearance-none",
        ])}
        type="checkbox"
      />
      <span className="ml-[1.375rem] mr-4">{color}</span>
      <span className={`${isChecked ? "line-through" : ""}`}>{label}</span>
    </>
  );
}

export default Checked;
