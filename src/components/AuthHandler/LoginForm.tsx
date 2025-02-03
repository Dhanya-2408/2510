import { useAuth } from "../../context/AuthContext";
import useObjectState from "../../custom-hooks/useObjectState";
import { initialFormState } from "../../models/constants";
import { IFormState, Messages } from "../../models/interfaces";
import {
  InputChangeEvent,
  InputFocusEvent,
  OnSubmitEvent,
} from "../../models/types";
import { authService } from "../../services/axiosServices";
import {
  Form,
  FormElement,
  FormPasswordInput,
  FormSubmit,
  FormTextInput,
} from "../../ui-kits/Form";
import { Form__Elemen__Types } from "../../ui-kits/Form/FormElements/FormElement";
import { safeSetTimeout } from "../../utils/generics";
import { FormError } from "../FormError";
import {
  ILoginFormState,
  initialLoginFormState,
  LoginFormInput,
  LoginFormInputs,
} from "./types";

export const LoginForm = () => {
  const {
    obj: loginState,
    get: getloginState,
    update: updateloginState,
  } = useObjectState(initialLoginFormState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<ILoginFormState>);

  const { handleFormValidate, handleOnFocusEvent, updateData, navigateToHome } =
    useAuth();

  const message: Messages = {
    success: "Logged in successfully!",
    error: "Error while login User!",
  };

  const loginParams = {
    ...authService.Login,
    params: loginState,
  };

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();
    const isValid = handleFormValidate(
      LoginFormInputs,
      loginState,
      updateFormState
    );
    if (isValid) {
      const data = await updateData(
        loginParams,
        formState,
        message,
        setFormState
      );
      if (data) {
        safeSetTimeout(navigateToHome, 1000, loginState.email);
      }
    }
  };

  return (
    <Form onSubmit={handleOnsubmit}>
      <FormElement elementType={Form__Elemen__Types.FormHeader}>
        <h1 className="Heading Text--highlight">LOGIN</h1>
      </FormElement>
      <FormError formState={formState} />
      {LoginFormInputs.map(({ validation, ...item }: LoginFormInput) => {
        const Tag: any =
          item.label === "Password" ? FormPasswordInput : FormTextInput;
        return (
          <FormElement key={item.name}>
            <Tag
              {...item}
              value={getloginState(item.name)}
              onFocus={(e: InputFocusEvent) =>
                handleOnFocusEvent(e, initialFormState, setFormState)
              }
              onChange={(e: InputChangeEvent) => {
                updateloginState(item.name, e.target.value);
              }}
            />
          </FormElement>
        );
      })}
      <FormSubmit isFull isLoading={formState.isButtonLoading}>
        LOGIN
      </FormSubmit>
    </Form>
  );
};
