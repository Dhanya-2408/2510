import { useAuth } from "../../../context/AuthContext";
import useObjectState from "../../../custom-hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import { IFormState, Messages } from "../../../models/interfaces";
import { OnSubmitEvent } from "../../../models/types";
import { fetchAllCaseStudyAsync } from "../../../redux/slices/casestudy/casestudy.reducer";
import { caseStudyId } from "../../../redux/slices/casestudy/casestudy.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { adminService } from "../../../services/axiosServices";
import { Form, FormElement, FormSubmit } from "../../../ui-kits/Form";
import { Form__Elemen__Types } from "../../../ui-kits/Form/FormElements/FormElement";
import { PageContentFitScreen } from "../../../ui-kits/Wrappers/PageContent.styles";
import { safeSetTimeout } from "../../../utils/generics";
import { FormError } from "../../FormError";
import { CaseStudySelect } from "../_common_/CaseStudySelect";

export const DeleteCaseStudy: React.FC = () => {
  const casestudyid = useAppSelector(caseStudyId);
  const { updateData } = useAuth();
  const dispatch = useAppDispatch();

  const message: Messages = {
    success: "Deleted successfully!",
    error: "Something went wrong , Try again later!",
  };

  const params = {
    ...adminService.deleteCaseStudy,
    params: {
      id: casestudyid,
    },
  };

  const { obj: formState, setObj: setFormState } = useObjectState(
    initialFormState as IFormState<number>
  );

  const handleOnsubmit = async (e: OnSubmitEvent) => {
    e.preventDefault();
    if (casestudyid) {
      await updateData(params, formState, message, setFormState);
      dispatch(fetchAllCaseStudyAsync());
    }

    safeSetTimeout(setFormState, 1000, initialFormState);
  };

  return (
    <PageContentFitScreen isNarrow>
      <Form onSubmit={handleOnsubmit}>
        <FormElement elementType={Form__Elemen__Types.FormHeader}>
          <h2 className="Heading Text--highlight">DELETE CASESTUDY</h2>
        </FormElement>
        <FormError formState={formState} />
        <CaseStudySelect />

        <FormSubmit isFull isLoading={formState.isButtonLoading}>
          DELETE
        </FormSubmit>
      </Form>
    </PageContentFitScreen>
  );
};
