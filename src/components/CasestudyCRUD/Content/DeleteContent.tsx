import React, { useEffect, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import useObjectState from "../../../custom-hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import { IFormState, Messages } from "../../../models/interfaces";
import { OnSubmitEvent } from "../../../models/types";
import { adminService } from "../../../services/axiosServices";
import {
  Form,
  FormElement,
  FormSelectInput,
  FormSubmit,
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
  ICaseStudyContent,
  ICaseStudyData,
} from "../../../redux/slices/casestudy/casestudy.type";
import { IDeleteContentFormState } from "./DeleteContent.types";
import { fetchAllCaseStudyAsync } from "../../../redux/slices/casestudy/casestudy.reducer";

export const DeleteCaseStudyContent: React.FC = () => {
  const { updateData } = useAuth();
  const casestudyid = useAppSelector(caseStudyId);
  const { data: casestudies } = useAppSelector(caseStudies);
  const dispatch = useAppDispatch();

  const initialCaseStudy = useMemo(() => {
    const selectedData = casestudies?.find(
      (data: ICaseStudyData) => data.casestudyid === casestudyid
    );
    return selectedData?.content || [];
  }, [casestudies, casestudyid]);

  const initialUpdateContentState = {
    contentid: initialCaseStudy[0]?.contentid?.toString() || "",
  };

  const { obj: addContentState, setObj } = useObjectState(
    initialUpdateContentState
  );

  const { obj: formState, setObj: setFormState } = useObjectState(
    initialFormState as IFormState<IDeleteContentFormState>
  );

  useEffect(() => {
    setObj(initialUpdateContentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCaseStudy]);

  const handleSelectChange = (name: string, option: string) => {
    const selectedData = initialCaseStudy?.find(
      (data: ICaseStudyContent) => data?.contentid?.toString() === option
    );

    setObj({
      contentid: selectedData?.contentid.toString() || "",
    });
  };

  const message: Messages = {
    success: "Updated successfully!",
    error: "Something went wrong , Try again later!",
  };

  const params = {
    ...adminService.deleteCaseStudyContent,
    params: {
      id: +addContentState.contentid,
    },
  };

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();

    if (addContentState?.contentid) {
      await updateData(params, formState, message, setFormState);
      dispatch(fetchAllCaseStudyAsync());
    }
    safeSetTimeout(setFormState, 1000, initialFormState);
  };

  return (
    <PageContentFitScreen isNarrow>
      <Form onSubmit={handleOnsubmit}>
        <FormElement elementType={Form__Elemen__Types.FormHeader}>
          <h2 className="Heading Text--highlight">Delete Casestudy Content</h2>
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
        <FormSubmit isFull isLoading={formState.isButtonLoading}>
          DELETE
        </FormSubmit>
      </Form>
    </PageContentFitScreen>
  );
};
