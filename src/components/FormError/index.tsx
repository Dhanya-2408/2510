import { IFormState } from "../../models/interfaces";
import { FormAlert } from "../../ui-kits/Form";
import { IF } from "../../ui-kits/IF";
import { isEmpty } from "../../utils/script";

interface IProps<T> {
  formState: IFormState<T>;
}

export const FormError = <T,>(props: IProps<T>) => {
  const { formState } = props;

  const getErrorText = (errors: string | object) => {
    if (typeof errors === "string") {
      return errors;
    }
    return Object.values(errors)[0];
  };

  return (
    <IF
      condition={!isEmpty(formState.helperText) || !isEmpty(formState.errors)}
    >
      <FormAlert
        isError={!formState.submitSuccess}
        isSuccess={formState.submitSuccess}
        classname="u-h6 Heading"
      >
        {formState.helperText ||
          (formState.errors && getErrorText(formState.errors))}
      </FormAlert>
    </IF>
  );
};
