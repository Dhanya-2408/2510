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
import { adminService } from "../../../services/axiosServices";
import {
  Form,
  FormElement,
  FormSelectInput,
  FormSubmit,
  FormTextArea,
} from "../../../ui-kits/Form";
import { Form__Elemen__Types } from "../../../ui-kits/Form/FormElements/FormElement";
import { PageContentFitScreen } from "../../../ui-kits/Wrappers/PageContent.styles";
import { safeSetTimeout } from "../../../utils/generics";
import { FormError } from "../../FormError";
import { CaseStudySelect } from "../_common_/CaseStudySelect";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  caseStudies,
  caseStudyId,
} from "../../../redux/slices/casestudy/casestudy.selector";
import {
  IUpdateContentFormState,
  UpdateContentInput,
  UpdateContentInputs,
} from "./UpdateContent.types";
import {
  ICaseStudyContent,
  ICaseStudyData,
} from "../../../redux/slices/casestudy/casestudy.type";
import { fetchAllCaseStudyAsync } from "../../../redux/slices/casestudy/casestudy.reducer";

export const UpdateCaseStudyContent: React.FC = () => {
  const casestudyid = useAppSelector(caseStudyId);
  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();
  const { data: casestudies } = useAppSelector(caseStudies);

  const dispatch = useAppDispatch();

  const initialCaseStudy = useMemo(() => {
    const selectedData = casestudies?.find(
      (data: ICaseStudyData) => data.casestudyid === casestudyid
    );
    return selectedData?.content || [];
  }, [casestudies, casestudyid]);

  const initialUpdateContentState: IUpdateContentFormState = {
    contentid: initialCaseStudy[0]?.contentid?.toString() || "",
    content: initialCaseStudy[0]?.content || "",
  };

  const {
    obj: addContentState,
    get: getAddContentState,
    update: updateAddContentState,
    setObj,
  } = useObjectState(initialUpdateContentState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IUpdateContentFormState>);

  console.log("casestudyid", casestudyid);

  useEffect(() => {
    setObj(initialUpdateContentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCaseStudy]);

  console.log(addContentState);

  const handleSelectChange = (name: string, option: string) => {
    const selectedData = initialCaseStudy?.find(
      (data: ICaseStudyContent) => data?.contentid?.toString() === option
    );

    setObj({
      content: selectedData?.content || "",
      contentid: selectedData?.contentid.toString() || "",
    });
  };

  const message: Messages = {
    success: "Updated successfully!",
    error: "Something went wrong , Try again later!",
  };

  const params = {
    ...adminService.updateCaseStudyContent,
    params: {
      casestudyid,
      contentid: +addContentState.contentid,
      content: addContentState.content,
    },
  };

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();
    const isValid = handleFormValidate(
      UpdateContentInputs,
      addContentState,
      updateFormState
    );
    if (isValid) {
      await updateData(params, formState, message, setFormState);
      dispatch(fetchAllCaseStudyAsync());
    }
    safeSetTimeout(setFormState, 1000, initialFormState);
  };

  return (
    <PageContentFitScreen isNarrow>
      <Form onSubmit={handleOnsubmit}>
        <FormElement elementType={Form__Elemen__Types.FormHeader}>
          <h2 className="Heading Text--highlight">Update Casestudy Content</h2>
        </FormElement>
        <FormError formState={formState} />
        <CaseStudySelect />
        <FormElement>
          <FormSelectInput
            name="casestudyid"
            options={
              initialCaseStudy?.map((item) => item.contentid.toString()) || []
            }
            value={addContentState?.contentid || ""}
            onSelect={handleSelectChange}
          />
        </FormElement>

        {UpdateContentInputs.map(
          ({ validation, ...item }: UpdateContentInput) => {
            return (
              <FormElement key={item.name}>
                <FormTextArea
                  label={item.label}
                  name={item.name}
                  value={getAddContentState("content")}
                  onFocus={(e: InputFocusEvent) =>
                    handleOnFocusEvent(e, initialFormState, setFormState)
                  }
                  onChange={(e: InputChangeEvent) => {
                    updateAddContentState(item.name, e.target.value);
                  }}
                />
              </FormElement>
            );
          }
        )}
        <FormSubmit isFull isLoading={formState.isButtonLoading}>
          UPDATE
        </FormSubmit>
      </Form>
    </PageContentFitScreen>
  );
};
