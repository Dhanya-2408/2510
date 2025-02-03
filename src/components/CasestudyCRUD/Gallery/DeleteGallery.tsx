import { useEffect, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import useObjectState from "../../../custom-hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import { IFormState, Messages } from "../../../models/interfaces";
import { OnSubmitEvent } from "../../../models/types";
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
import { Form, FormSelectInput, FormSubmit } from "../../../ui-kits/Form";
import {
  FormElement,
  Form__Elemen__Types,
} from "../../../ui-kits/Form/FormElements/FormElement";
import { PageContentFitScreen } from "../../../ui-kits/Wrappers/PageContent.styles";
import { safeSetTimeout } from "../../../utils/generics";
import { FormError } from "../../FormError";
import { CaseStudySelect } from "../_common_/CaseStudySelect";

export type IDeleteGalleryFormState = {
  galleryid: string;
};

export const DeleteCaseStudyGallery: React.FC = () => {
  const casestudyid = useAppSelector(caseStudyId);
  const { updateData } = useAuth();
  const { data: casestudies } = useAppSelector(caseStudies);

  const dispatch = useAppDispatch();

  const initialCaseStudy = useMemo(() => {
    const selectedData = casestudies?.find(
      (data: ICaseStudyData) => data.casestudyid === casestudyid
    );
    return selectedData?.gallery || [];
  }, [casestudies, casestudyid]);

  const initialUpdateContentState = {
    galleryid: initialCaseStudy[0]?.galleryid?.toString() || "",
  };

  const { obj: addContentState, setObj } = useObjectState(
    initialUpdateContentState
  );

  const { obj: formState, setObj: setFormState } = useObjectState(
    initialFormState as IFormState<IDeleteGalleryFormState>
  );

  useEffect(() => {
    setObj(initialUpdateContentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCaseStudy]);

  const handleSelectChange = (name: string, option: string) => {
    const selectedData = initialCaseStudy?.find(
      (data: ICaseStudyImage) => data?.galleryid?.toString() === option
    );

    setObj({
      galleryid: selectedData?.galleryid.toString() || "",
    });
  };

  const message: Messages = {
    success: "Updated successfully!",
    error: "Something went wrong , Try again later!",
  };

  const params = {
    ...adminService.deleteCaseGallery,
    params: {
      id: +addContentState.galleryid,
    },
  };

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();

    if (addContentState?.galleryid) {
      await updateData(params, formState, message, setFormState);
      dispatch(fetchAllCaseStudyAsync());
    }
    safeSetTimeout(setFormState, 1000, initialFormState);
  };

  return (
    <PageContentFitScreen isNarrow>
      <Form onSubmit={handleOnsubmit}>
        <FormElement elementType={Form__Elemen__Types.FormHeader}>
          <h1 className="Heading Text--highlight">Delete Casestudy Gallery</h1>
        </FormElement>
        <FormError formState={formState} />
        <CaseStudySelect />
        <FormElement>
          <FormSelectInput
            name="casestudyid"
            options={
              initialCaseStudy?.map((item) => item.galleryid.toString()) || []
            }
            value={addContentState?.galleryid || ""}
            onSelect={handleSelectChange}
          />
        </FormElement>
        <FormSubmit isFull isLoading={formState.isButtonLoading}>
          DELETE
        </FormSubmit>
      </Form>
    </PageContentFitScreen>
  );
};
