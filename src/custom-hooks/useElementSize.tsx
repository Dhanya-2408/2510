import { useCallback, useState } from "react";
import useEventListener from "./useEventListener";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect ";

interface Size {
  width: number;
  height: number;
  top: number;
  left: number;
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size
] {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
      top: ref?.offsetTop || 0,
      left: ref?.offsetLeft || 0,
    });
  }, [ref?.offsetHeight, ref?.offsetLeft, ref?.offsetTop, ref?.offsetWidth]);

  useEventListener("resize", handleSize);

  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, [ref?.offsetHeight, ref?.offsetWidth, ref?.offsetTop]);

  return [setRef, size];
}

export default useElementSize;
