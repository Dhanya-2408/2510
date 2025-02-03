import { useEffect, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import useObjectState from "../../../custom-hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import { InputType } from "../../../models/enums";
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
import {
  ICaseStudyData,
  ICaseStudyImage,
} from "../../../redux/slices/casestudy/casestudy.type";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { adminService } from "../../../services/axiosServices";
import {
  Form,
  FormElement,
  FormSelectInput,
  FormSubmit,
  FormTextInput,
} from "../../../ui-kits/Form";
import { Form__Elemen__Types } from "../../../ui-kits/Form/FormElements/FormElement";
import { IF } from "../../../ui-kits/IF";
import { PageContentFitScreen } from "../../../ui-kits/Wrappers/PageContent.styles";
import { safeSetTimeout } from "../../../utils/generics";
import { FormError } from "../../FormError";
import { CaseStudySelect } from "../_common_/CaseStudySelect";
import FileUpload from "./File_Upload/File-Upload";
import {
  IUpdateGalleryFormState,
  UpdateGalleryInput,
  UpdateGalleryInputs,
} from "./UpdateGallery.types";

export const UpdateCaseStudyGallery: React.FC = () => {
  const casestudyid = useAppSelector(caseStudyId);
  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();
  const { data: casestudies } = useAppSelector(caseStudies);

  const dispatch = useAppDispatch();

  const initialCaseStudy = useMemo(() => {
    const selectedData = casestudies?.find(
      (data: ICaseStudyData) => data.casestudyid === casestudyid
    );
    return selectedData?.gallery || [];
  }, [casestudies, casestudyid]);

  const initialUpdateGalleryState: IUpdateGalleryFormState = {
    galleryid: initialCaseStudy[0]?.galleryid?.toString() || "",
    gallerytitle: initialCaseStudy[0]?.gallerytitle || "",
    imageurl: initialCaseStudy[0]?.imageurl || "",
    file: "",
  };

  const {
    obj: addGalleryState,
    get: getAddContentState,
    update: updateAddContentState,
    setObj,
  } = useObjectState(initialUpdateGalleryState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IUpdateGalleryFormState>);

  useEffect(() => {
    setObj(initialUpdateGalleryState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCaseStudy]);

  const handleSelectChange = (name: string, option: string) => {
    const selectedData = initialCaseStudy?.find(
      (data: ICaseStudyImage) => data?.galleryid?.toString() === option
    );

    setObj({
      ...addGalleryState,
      gallerytitle: selectedData?.gallerytitle || "",
      galleryid: selectedData?.galleryid.toString() || "",
      imageurl: selectedData?.imageurl.toString() || "",
    });
  };

  const message: Messages = {
    success: "Updated successfully!",
    error: "Something went wrong , Try again later!",
  };

  const params = {
    ...adminService.updateCaseGallery,
    params: {
      casestudyid,
      gallerytitle: addGalleryState.gallerytitle,
      galleryid: +addGalleryState.galleryid,
    },
  };

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();
    const isValid = handleFormValidate(
      UpdateGalleryInputs,
      addGalleryState,
      updateFormState
    );
    if (isValid) {
      const formData = new FormData();
      formData.append("file", addGalleryState.file);

      const dataParams = {
        ...params,
        data: formData,
      };

      await updateData(dataParams, formState, message, setFormState);
      dispatch(fetchAllCaseStudyAsync());
    }
    safeSetTimeout(setFormState, 1000, initialFormState);
  };

  return (
    <PageContentFitScreen isNarrow>
      <Form onSubmit={handleOnsubmit}>
        <FormElement elementType={Form__Elemen__Types.FormHeader}>
          <h1 className="Heading Text--highlight">Update Casestudy Content</h1>
        </FormElement>
        <FormError formState={formState} />
        <CaseStudySelect />
        <FormElement>
          <FormSelectInput
            name="casestudyid"
            options={
              initialCaseStudy?.map((item) => item.galleryid.toString()) || []
            }
            value={addGalleryState?.galleryid || ""}
            onSelect={handleSelectChange}
          />
        </FormElement>
        {UpdateGalleryInputs.map(
          ({ validation, ...item }: UpdateGalleryInput) => {
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
                  {/* <div className="Text--alignCenter">
                    {!addGalleryState.file && (
                      <img
                        src={addGalleryState.imageurl}
                        alt={addGalleryState.gallerytitle}
                      />
                    )}
                  </div> */}
                  <FileUpload
                    changeHandler={(picture) => {
                      updateAddContentState(item.name, picture);
                    }}
                  />
                </IF>
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
