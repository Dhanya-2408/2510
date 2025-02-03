import React from "react";
import { useAuth } from "../../../context/AuthContext";
import useObjectState from "../../../custom-hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import { IFormState, Messages } from "../../../models/interfaces";
import {
  InputChangeEvent,
  InputFocusEvent,
  OnSubmitEvent,
} from "../../../models/types";
import { adminService } from "../../../services/axiosServices";
import {
  Form,
  FormElement,
  FormSubmit,
  FormTextArea,
} from "../../../ui-kits/Form";
import { Form__Elemen__Types } from "../../../ui-kits/Form/FormElements/FormElement";
import { PageContentFitScreen } from "../../../ui-kits/Wrappers/PageContent.styles";
import { safeSetTimeout } from "../../../utils/generics";
import { FormError } from "../../FormError";
import { CaseStudySelect } from "../_common_/CaseStudySelect";
import {
  AddContentInput,
  AddContentInputs,
  IAddContentFormState,
  initialAddContentState,
} from "./AddContent.types";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { caseStudyId } from "../../../redux/slices/casestudy/casestudy.selector";
import { fetchAllCaseStudyAsync } from "../../../redux/slices/casestudy/casestudy.reducer";

export const AddCaseStudyContent: React.FC = () => {
  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();

  const casestudyid = useAppSelector(caseStudyId);
  const dispatch = useAppDispatch();

  const {
    obj: addContentState,
    get: getAddContentState,
    update: updateAddContentState,
    setObj: setAddContentState,
  } = useObjectState(initialAddContentState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IAddContentFormState>);

  const message: Messages = {
    success: " Updated successfully!",
    error: "Something went wrong , Try again later!",
  };

  const params = {
    ...adminService.addCaseStudyContent,
    params: {
      ...addContentState,
      casestudyid,
    },
  };

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();
    const isValid = handleFormValidate(
      AddContentInputs,
      addContentState,
      updateFormState
    );
    if (isValid) {
      await updateData(params, formState, message, setFormState);
      dispatch(fetchAllCaseStudyAsync());
    }
    safeSetTimeout(setFormState, 1000, initialFormState);
    safeSetTimeout(setAddContentState, 1000, initialAddContentState);
  };

  return (
    <PageContentFitScreen isNarrow>
      <Form onSubmit={handleOnsubmit}>
        <FormElement elementType={Form__Elemen__Types.FormHeader}>
          <h2 className="Heading Text--highlight">Add Casestudy Content</h2>
        </FormElement>
        <FormError formState={formState} />
        <CaseStudySelect />
        {AddContentInputs.map(({ validation, ...item }: AddContentInput) => {
          return (
            <FormElement key={item.name}>
              <FormTextArea
                label={item.label}
                name={item.name}
                value={getAddContentState(item.name)}
                onFocus={(e: InputFocusEvent) =>
                  handleOnFocusEvent(e, initialFormState, setFormState)
                }
                onChange={(e: InputChangeEvent) => {
                  updateAddContentState(item.name, e.target.value);
                }}
              />
            </FormElement>
          );
        })}
        <FormSubmit isFull isLoading={formState.isButtonLoading}>
          ADD
        </FormSubmit>
      </Form>
    </PageContentFitScreen>
  );
};
