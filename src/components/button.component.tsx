import clsx from "clsx";

type TProps = {
  icon?: string;
  className?: string;
  textStyle?: string;
  children: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className, icon, textStyle, ...rest }: TProps) {
  return (
    <button
      type="submit"
      className={clsx([
        "disabled:opacity-20 py-[0.844rem] px-[1.813rem] text-lg border-0 outline-none ring-0 focus:ring-0",
        "text-white rounded-full",
        className,
      ])}
      {...rest}
    >
      <div className="flex gap-x-[.688rem] text-center">
        {icon && <img src={icon} alt="icon" />}
        <span className={clsx(["text-lg font-semibold", textStyle])}>
          {children}
        </span>
      </div>
    </button>
  );
}

export default Button;
