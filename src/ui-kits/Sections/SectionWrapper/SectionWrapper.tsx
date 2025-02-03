import { FC, ReactNode } from "react";
import classNames from "classnames";
import "./SectionWrapper.scss";

interface IProps {
  children: ReactNode;
  isLarge?: boolean;
  ishidden?: boolean;
  isbordered?: boolean;
}

export const SectionWrapper: FC<IProps> = (props: IProps) => {
  const { isbordered, ishidden, isLarge, children } = props;
  return (
    <div
      className={classNames("Section__Wrapper", {
        "Section__Wrapper--bordered": isbordered,
        "Section__Wrapper--hidden": ishidden,
      })}
    >
      <section
        className={classNames("Section__Container", {
          "Section__Container--large": isLarge,
        })}
      >
        {children}
      </section>
    </div>
  );
};
