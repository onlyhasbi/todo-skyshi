import { RefObject, useCallback, useEffect } from "react";

export function useClickAway(
  ref: RefObject<HTMLElement>,
  callback: () => void
) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        callback();
      }
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
}
