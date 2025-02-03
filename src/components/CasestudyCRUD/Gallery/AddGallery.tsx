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
  FormTextInput,
} from "../../../ui-kits/Form";
import { Form__Elemen__Types } from "../../../ui-kits/Form/FormElements/FormElement";
import { PageContentFitScreen } from "../../../ui-kits/Wrappers/PageContent.styles";
import { safeSetTimeout } from "../../../utils/generics";
import { FormError } from "../../FormError";
import { CaseStudySelect } from "../_common_/CaseStudySelect";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { caseStudyId } from "../../../redux/slices/casestudy/casestudy.selector";
import {
  AddGalleryInput,
  AddGalleryInputs,
  IAddGalleryFormState,
  initialAddGalleryState,
} from "./AddGallery.types";
import FileUpload from "./File_Upload/File-Upload";
import { IF } from "../../../ui-kits/IF";
import { InputType } from "../../../models/enums";
import { fetchAllCaseStudyAsync } from "../../../redux/slices/casestudy/casestudy.reducer";

export const AddCaseStudyGallery: React.FC = () => {
  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();

  const casestudyid = useAppSelector(caseStudyId);
  const dispatch = useAppDispatch();

  const {
    obj: addContentState,
    get: getAddContentState,
    update: updateAddContentState,
    setObj: setContentState,
  } = useObjectState(initialAddGalleryState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IAddGalleryFormState>);

  console.log("addContentState", addContentState);

  const message: Messages = {
    success: " Updated successfully!",
    error: "Something went wrong , Try again later!",
  };

  const params = {
    ...adminService.addCaseGallery,
    params: {
      casestudyid,
      gallerytitle: addContentState.gallerytitle,
    },
  };

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();
    const isValid = handleFormValidate(
      AddGalleryInputs,
      addContentState,
      updateFormState
    );
    if (isValid) {
      const formData = new FormData();
      formData.append("file", addContentState.imageurl);

      const dataParams = {
        ...params,
        data: formData,
      };

      await updateData(dataParams, formState, message, setFormState);
      dispatch(fetchAllCaseStudyAsync());
    }
    safeSetTimeout(setFormState, 1000, initialFormState);
    safeSetTimeout(setContentState, 1000, initialAddGalleryState);
  };

  return (
    <PageContentFitScreen isNarrow>
      <Form onSubmit={handleOnsubmit}>
        <FormElement elementType={Form__Elemen__Types.FormHeader}>
          <h1 className="Heading Text--highlight">Add Casestudy Gallery</h1>
        </FormElement>
        <FormError formState={formState} />
        <CaseStudySelect />
        {AddGalleryInputs.map(({ validation, ...item }: AddGalleryInput) => {
          return (
            <FormElement key={item.name}>
              <IF condition={item.type !== InputType.file}>
                <FormTextInput
                  {...item}
                  value={getAddContentState(item.name)}
                  onFocus={(e: InputFocusEvent) =>
                    handleOnFocusEvent(e, initialFormState, setFormState)
                  }
                  onChange={(e: InputChangeEvent) => {
                    updateAddContentState(item.name, e.target.value);
                  }}
                />
              </IF>
              <IF condition={item.type === InputType.file}>
                <FileUpload
                  changeHandler={(picture) => {
                    updateAddContentState(item.name, picture);
                  }}
                />
              </IF>
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
