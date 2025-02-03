import { InputType } from "../../../models/enums";
import { InputBaseProps } from "../../../models/interfaces";
import { validationRules } from "../../../utils/Validation";

export type IAddContentFormState = {
  // casestudyid: string;
  //   contentid: string;
  content: string;
};

export type AddContentInput = InputBaseProps<IAddContentFormState>;

export const initialAddContentState: IAddContentFormState = {
  content: "",
  // casestudyid: "",
};

export const AddContentInputs: AddContentInput[] = [
  {
    name: "content",
    label: "Content",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
];
