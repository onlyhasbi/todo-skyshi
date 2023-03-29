import { animated, useSpring } from "@react-spring/web";

function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const fade = useSpring({
    from: { opacity: "0" },
    to: { opacity: "1" },
    delay: 75,
  });

  return (
    <section className={`w-9/12 mx-auto ${className}`}>
      <animated.div style={fade}>{children}</animated.div>
    </section>
  );
}

export default Wrapper;
