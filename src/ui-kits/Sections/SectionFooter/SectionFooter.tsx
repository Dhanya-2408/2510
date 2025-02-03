import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export const SectionFooter: FC<IProps> = (props: IProps) => {
  const { children } = props;

  return <div className="SectionFooter">{children}</div>;
};
