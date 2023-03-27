function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`w-9/12 mx-auto ${className}`}>{children}</section>
  );
}

export default Wrapper;
