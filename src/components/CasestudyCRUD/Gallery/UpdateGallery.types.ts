import { InputType } from "../../../models/enums";
import { InputBaseProps } from "../../../models/interfaces";
import { validationRules } from "../../../utils/Validation";

export type IUpdateGalleryFormState = {
  gallerytitle: string;
  imageurl: string;
  galleryid: string;
  file: string;
};

export type UpdateGalleryInput = InputBaseProps<IUpdateGalleryFormState>;

export const initialUpdateGalleryState: IUpdateGalleryFormState = {
  gallerytitle: "",
  imageurl: "",
  galleryid: "",
  file: "",
};

export const UpdateGalleryInputs: UpdateGalleryInput[] = [
  {
    name: "gallerytitle",
    label: "Gallery Title",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "file",
    label: "Image",
    type: InputType.file,
    validation: [{ rule: validationRules.required }],
  },
];
