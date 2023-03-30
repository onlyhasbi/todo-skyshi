function EmptyActivity({ src, section }: { src: string; section: string }) {
  return (
    <img
      loading="lazy"
      className="w-[767px] mx-auto mt-[3.688rem] mb-[16.688rem]"
      src={src}
      alt="empty-state-image"
      data-cy={
        section === "activity" ? "activity-empty-state" : "todo-empty-state"
      }
    />
  );
}

export default EmptyActivity;
