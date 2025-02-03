import { ReactElement } from "react";
import "./Spinner.scss";

export const Spinner = (): ReactElement => {
  return (
    <div className="Spinner">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
