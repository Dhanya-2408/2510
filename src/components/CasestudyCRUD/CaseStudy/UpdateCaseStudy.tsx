import React, { useEffect, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import useObjectState from "../../../custom-hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import { IFormState, Messages } from "../../../models/interfaces";
import {
  InputChangeEvent,
  InputFocusEvent,
  OnSubmitEvent,
} from "../../../models/types";
import { fetchAllCaseStudyAsync } from "../../../redux/slices/casestudy/casestudy.reducer";
import {
  caseStudies,
  caseStudyId,
} from "../../../redux/slices/casestudy/casestudy.selector";
import { ICaseStudyData } from "../../../redux/slices/casestudy/casestudy.type";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { adminService } from "../../../services/axiosServices";
import {
  Form,
  FormElement,
  FormSubmit,
  FormTextArea,
  FormTextInput,
} from "../../../ui-kits/Form";
import { Form__Elemen__Types } from "../../../ui-kits/Form/FormElements/FormElement";
import { PageContentFitScreen } from "../../../ui-kits/Wrappers/PageContent.styles";
import { safeSetTimeout } from "../../../utils/generics";
import { FormError } from "../../FormError";
import { CaseStudySelect } from "../_common_/CaseStudySelect";
import {
  IUpdateCaseStudyFormState,
  UpdateCaseStudyInput,
  UpdateCaseStudyInputs,
} from "./UpdateCaseStudy.types";

export const UpdateCaseStudy: React.FC = () => {
  const groupInputs = UpdateCaseStudyInputs.slice(
    0,
    UpdateCaseStudyInputs.length - 1
  );
  const messageInput = UpdateCaseStudyInputs[UpdateCaseStudyInputs.length - 1];

  const casestudyid = useAppSelector(caseStudyId);
  const { data: casestudies } = useAppSelector(caseStudies);
  const dispatch = useAppDispatch();

  const initialCaseStudy = useMemo(() => {
    const selectedData = casestudies?.find(
      (data: ICaseStudyData) => data.casestudyid === casestudyid
    );

    return {
      casetitle: selectedData?.casetitle || "",
      casecategory: selectedData?.casecategory || "",
      casedescription: selectedData?.casedescription || "",
    };
  }, [casestudies, casestudyid]);

  const {
    obj: addCaseStudyState,
    get: getAddCaseStudyState,
    update: updateAddCaseStudyState,
    setObj,
  } = useObjectState(initialCaseStudy);

  useEffect(() => {
    setObj(initialCaseStudy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCaseStudy]);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IUpdateCaseStudyFormState>);

  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();

  const message: Messages = {
    success: " Updated successfully!",
    error: "Something went wrong , Try again later!",
  };

  const params = {
    ...adminService.updateCaseStudy,
    params: {
      casestudyid,
      ...addCaseStudyState,
    },
  };

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();
    const isValid = handleFormValidate(
      UpdateCaseStudyInputs,
      addCaseStudyState,
      updateFormState
    );

    if (isValid) {
      await updateData(params, formState, message, setFormState);
      dispatch(fetchAllCaseStudyAsync());
      window.location.reload();
    }

    safeSetTimeout(setFormState, 1000, initialFormState);
  };

  return (
    <PageContentFitScreen isNarrow>
      <Form onSubmit={handleOnsubmit}>
        <FormElement elementType={Form__Elemen__Types.FormHeader}>
          <h2 className="Heading Text--highlight">UPDATE CASESTUDY</h2>
        </FormElement>
        <FormError formState={formState} />
        <CaseStudySelect />
        {groupInputs.map(({ validation, ...item }: UpdateCaseStudyInput) => {
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
          UPDATE
        </FormSubmit>
      </Form>
    </PageContentFitScreen>
  );
};
