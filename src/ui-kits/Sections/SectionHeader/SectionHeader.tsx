import { FC, ReactNode } from "react";
import { isEmpty } from "../../../utils/script";
import { IF } from "../../IF";
import "./SectionHeader.scss";

interface IProps {
  heading?: string | ReactNode;
  subHeading?: string | ReactNode;
  description?: ReactNode;
}

export const SectionHeader: FC<IProps> = (props: IProps) => {
  const { subHeading, heading, description } = props;

  return (
    <div className="SectionHeader">
      <IF condition={!isEmpty(heading)}>
        <h1 className="SectionHeader__Heading Text--highlight Heading">
          {heading}
        </h1>
      </IF>
      <IF condition={!isEmpty(subHeading)}>
        <div className="SectionHeader__SubHeading Heading u-h4 ">
          {subHeading}
        </div>
      </IF>
      <IF condition={!isEmpty(description)}>
        <p className="SectionHeader__Description">{description}</p>
      </IF>
    </div>
  );
};
