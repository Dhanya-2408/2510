import { IValidation } from "../utils/Validation";
import { InputType } from "./enums";

type messageName = "success" | "error";
export type Messages = Record<messageName, string>;

export interface IFormState<T> {
  submitSuccess: boolean;
  isButtonLoading: boolean;
  helperText: string;
  errors: Partial<T | null>;
}

export interface InputBaseProps<T> {
  name: keyof T;
  type: InputType;
  label: string;
  id?: string | number;
  placeholder?: string;
  validation?: IValidation[];
}

export interface IErrors {
  [key: string]: string;
}

export interface IBanner {
  title: string;
  subTitle: string;
  images: string[];
}
