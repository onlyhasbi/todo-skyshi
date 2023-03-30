function EmptyActivity({ src }: { src: string }) {
  return (
    <img
      loading="lazy"
      className="w-[767px] mx-auto mt-[3.688rem] mb-[16.688rem]"
      src={src}
      alt="empty-state-image"
      data-cy="activity-empty-state"
    />
  );
}

export default EmptyActivity;
