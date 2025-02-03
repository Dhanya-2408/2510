import { ComponentType, ReactNode, CSSProperties, useRef } from "react";
import useIntersectionObserver from "../../custom-hooks/useIntersectionObserver";

interface LazyLoadProps {
  tag?: ComponentType | string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  root?: Element | Document | null;
  threshold?: number | number[];
  rootMargin?: string;
  forward?: boolean;
}

export default function LazyLoad(props: LazyLoadProps) {
  const { tag = "div", children, style, className } = props;

  const Tag: any = tag;
  const ref = useRef<Element>(null);
  const entry = useIntersectionObserver(ref, {
    freezeOnceVisible: true,
  });
  const isIntersecting = !!entry?.isIntersecting;

  return (
    <Tag
      ref={ref}
      style={style}
      className={className}
      children={isIntersecting ? children : null}
    />
  );
}
