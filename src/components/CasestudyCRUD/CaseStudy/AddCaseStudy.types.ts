import { InputType } from "../../../models/enums";
import { InputBaseProps } from "../../../models/interfaces";
import { validationRules } from "../../../utils/Validation";

export type IAddCaseStudyFormState = {
  casetitle: string;
  casecategory: string;
  casedescription: string;
};

export type AddCaseStudyInput = InputBaseProps<IAddCaseStudyFormState>;

export const initialAddCaseStudyState: IAddCaseStudyFormState = {
  casetitle: "",
  casecategory: "",
  casedescription: "",
};

export const AddCaseStudyInputs: AddCaseStudyInput[] = [
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
