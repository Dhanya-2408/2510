import { useState } from "react";
import useEventListener from "./useEventListener";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updatePosition = () => {
    setScrollPosition(window.pageYOffset);
  };

  useEventListener("scroll", updatePosition);

  return { scrollPosition, scrollTop };
};

export default useScrollPosition;
