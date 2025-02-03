import { InputType } from "../../../models/enums";
import { InputBaseProps } from "../../../models/interfaces";
import { validationRules } from "../../../utils/Validation";

export type IUpdateContentFormState = {
  contentid: string;
  content: string;
};

export type UpdateContentInput = InputBaseProps<IUpdateContentFormState>;

export const UpdateContentInputs: UpdateContentInput[] = [
  {
    name: "content",
    label: "Content",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
];
