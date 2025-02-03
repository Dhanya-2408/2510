import { InputType } from "../../../models/enums";
import { InputBaseProps } from "../../../models/interfaces";
import { validationRules } from "../../../utils/Validation";

export type IUpdateCaseStudyFormState = {
  casetitle: string;
  casecategory: string;
  casedescription: string;
};

export type UpdateCaseStudyInput = InputBaseProps<IUpdateCaseStudyFormState>;

export const UpdateCaseStudyInputs: UpdateCaseStudyInput[] = [
  {
    name: "casetitle",
    label: "Case Title",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "casecategory",
    label: "Case Category",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "casedescription",
    label: "Case Description",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
];
