import React from "react";
import {
  Form,
  FormElement,
  FormSubmit,
  FormTextArea,
  FormTextInput,
} from "../../../ui-kits/Form";
import useObjectState from "../../../custom-hooks/useObjectState";
import {
  AddCaseStudyInput,
  AddCaseStudyInputs,
  IAddCaseStudyFormState,
  initialAddCaseStudyState,
} from "./AddCaseStudy.types";
import { initialFormState } from "../../../models/constants";
import { IFormState, Messages } from "../../../models/interfaces";
import { adminService } from "../../../services/axiosServices";
import {
  InputChangeEvent,
  InputFocusEvent,
  OnSubmitEvent,
} from "../../../models/types";
import { useAuth } from "../../../context/AuthContext";
import { FormError } from "../../FormError";
import { safeSetTimeout } from "../../../utils/generics";
import { Form__Elemen__Types } from "../../../ui-kits/Form/FormElements/FormElement";
import { useAppDispatch } from "../../../redux/store";
import { fetchAllCaseStudyAsync } from "../../../redux/slices/casestudy/casestudy.reducer";

export const AddCaseStudy: React.FC = () => {
  const groupInputs = AddCaseStudyInputs.slice(
    0,
    AddCaseStudyInputs.length - 1
  );
  const messageInput = AddCaseStudyInputs[AddCaseStudyInputs.length - 1];

  const {
    obj: addCaseStudyState,
    get: getAddCaseStudyState,
    update: updateAddCaseStudyState,
    setObj: setCaseStudyState,
  } = useObjectState(initialAddCaseStudyState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IAddCaseStudyFormState>);

  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();
  const dispatch = useAppDispatch();

  const message: Messages = {
    success: " Updated successfully!",
    error: "Something went wrong , Try again later!",
  };

  const params = {
    ...adminService.addCaseStudy,
    params: addCaseStudyState,
  };

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();
    const isValid = handleFormValidate(
      AddCaseStudyInputs,
      addCaseStudyState,
      updateFormState
    );

    if (isValid) {
      await updateData(params, formState, message, setFormState);
      dispatch(fetchAllCaseStudyAsync());
    }

    safeSetTimeout(setFormState, 1000, initialFormState);
    safeSetTimeout(setCaseStudyState, 1000, initialAddCaseStudyState);
  };

  return (
    <Form onSubmit={handleOnsubmit}>
      <FormElement elementType={Form__Elemen__Types.FormHeader}>
        <h1 className="Heading Text--highlight">Add Casestudy</h1>
      </FormElement>
      <FormError formState={formState} />
      {groupInputs.map(({ validation, ...item }: AddCaseStudyInput) => {
        return (
          <FormElement key={item.name}>
            <FormTextInput
              {...item}
              value={getAddCaseStudyState(item.name)}
              onFocus={(e: InputFocusEvent) =>
                handleOnFocusEvent(e, initialFormState, setFormState)
              }
              onChange={(e: InputChangeEvent) => {
                updateAddCaseStudyState(item.name, e.target.value);
              }}
            />
          </FormElement>
        );
      })}
      <FormElement>
        <FormTextArea
          label={messageInput.label}
          name={messageInput.name}
          value={getAddCaseStudyState(messageInput.name)}
          onFocus={(e: InputFocusEvent) =>
            handleOnFocusEvent(e, initialFormState, setFormState)
          }
          onChange={(e: InputChangeEvent) => {
            updateAddCaseStudyState(messageInput.name, e.target.value);
          }}
        />
      </FormElement>
      <FormSubmit isFull isLoading={formState.isButtonLoading}>
        ADD
      </FormSubmit>
    </Form>
  );
};
