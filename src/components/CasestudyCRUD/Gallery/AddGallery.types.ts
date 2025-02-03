import { InputType } from "../../../models/enums";
import { InputBaseProps } from "../../../models/interfaces";
import { validationRules } from "../../../utils/Validation";

export type IAddGalleryFormState = {
  gallerytitle: string;
  imageurl: any;
};

export type AddGalleryInput = InputBaseProps<IAddGalleryFormState>;

export const initialAddGalleryState: IAddGalleryFormState = {
  gallerytitle: "",
  imageurl: "",
};

export const AddGalleryInputs: AddGalleryInput[] = [
  {
    name: "gallerytitle",
    label: "Gallery Title",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "imageurl",
    label: "Image",
    type: InputType.file,
    validation: [{ rule: validationRules.required }],
  },
];
