import { Fragment } from "react";

interface IVisible {
  condition: boolean;
  children: React.ReactNode;
}

export const IF = ({ condition, children }: IVisible): JSX.Element | null =>
  condition ? <Fragment>{children}</Fragment> : null;
