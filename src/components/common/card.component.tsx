import clsx from "clsx";

type TProps = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function Card({ className, children, ...rest }: TProps) {
  return (
    <div
      className={clsx([
        "w-[14.688rem] h-[14.625rem] shadow-md bg-white rounded-xl",
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
