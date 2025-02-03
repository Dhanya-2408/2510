import { useState } from "react";
import { IFormState, Messages } from "../../models/interfaces";
import { initialFormState } from "../../models/constants";
import { Form, FormElement, FormTextInput } from "../../ui-kits/Form";
import {
  BUTTON_TYPE_CLASSES,
  TextButton,
} from "../../ui-kits/TextButton/TextButton.component";
import { IValidation, validationRules } from "../../utils/Validation";
import { InputChangeEvent, InputFocusEvent } from "../../models/types";
import { FormError } from "../FormError";
import useObjectState from "../../custom-hooks/useObjectState";
import { authService } from "../../services/axiosServices";
import { useAuth } from "../../context/AuthContext";
import { safeSetTimeout } from "../../utils/generics";

export const FooterNewsLetter = () => {
  const [email, setEmail] = useState<string | null>(null);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<string>);

  const validation: IValidation[] = [
    { rule: validationRules.email },
    { rule: validationRules.required },
  ];

  const { updateData } = useAuth();

  const handleOnchange = (e: InputChangeEvent) => {
    setEmail(e.target.value);
  };

  const handleOnFocusEvent = (e: InputFocusEvent): void => {
    e.preventDefault();
    setFormState({
      ...initialFormState,
      errors: "",
    });
  };

  const handleValidate = () => {
    let error: string = "";
    let isValid: boolean = true;
    validation.forEach((vRule) => {
      const errorMessage = vRule!.rule(email, "Email", vRule!.args);
      if (errorMessage.length) {
        error = errorMessage;
        isValid = false;
      }
    });
    updateFormState("errors", error);
    return isValid;
  };

  const params = {
    ...authService.addSubscribeEmail,
    params: { email },
  };

  const message: Messages = {
    success: "Subscribed successfully!",
    error: "Something went wronng, Try again later!",
  };

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const isValid = handleValidate();
    if (isValid) {
      await updateData(
        params,
        formState as IFormState<string>,
        message,
        setFormState
      );
    }
    safeSetTimeout(setFormState, 3000, initialFormState);
  };

  return (
    <div className="Footer__Block Footer__Block--connected u-h5">
      <h4 className="Footer__Title Heading">Sign Up for Newsletter</h4>
      <FormError formState={formState} />
      <Form onSubmit={handleSubmit}>
        <FormElement>
          <FormTextInput
            type="email"
            name="email"
            value={email || ""}
            placeholder="Email"
            onChange={handleOnchange}
            onFocus={handleOnFocusEvent}
          />
        </FormElement>
        <TextButton
          buttonType={BUTTON_TYPE_CLASSES.overlay}
          isLoading={formState.isButtonLoading}
          isFull
        >
          SUBSCRIBE
        </TextButton>
      </Form>
    </div>
  );
};
