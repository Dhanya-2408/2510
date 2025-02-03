import { useEffect, useMemo } from "react";
import {
  caseStudies,
  caseStudyId,
} from "../../../redux/slices/casestudy/casestudy.selector";
import { setCaseStudyId } from "../../../redux/slices/casestudy/casestudy.slice";
import { ICaseStudyData } from "../../../redux/slices/casestudy/casestudy.type";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { FormElement, FormSelectInput } from "../../../ui-kits/Form";

export const CaseStudySelect = () => {
  const { data } = useAppSelector(caseStudies);
  const id = useAppSelector(caseStudyId);
  const dispatch = useAppDispatch();

  const caseStudyIds = useMemo(() => {
    let ids: string[] = [];
    if (data) {
      ids = data.map((x: ICaseStudyData) => x.casetitle.toString());
    }
    return ids;
  }, [data]);

  const getSelectedId = (caseStudies: ICaseStudyData[], option: string) => {
    return caseStudies?.find(
      (x: ICaseStudyData) =>
        x.casetitle.toLocaleLowerCase() === option.toLocaleLowerCase()
    );
  };

  const getSelectedCaseStudyName = (
    caseStudies: ICaseStudyData[],
    casestudyid: number
  ) => {
    return caseStudies?.find(
      (x: ICaseStudyData) => x.casestudyid === casestudyid
    );
  };

  const handleSelectChange = (name: string, option: string) => {
    if (data) {
      const id = getSelectedId(data, option);
      dispatch(setCaseStudyId(id?.casestudyid as number));
    }
  };

  useEffect(() => {
    if (data) {
      const id = getSelectedId(data, caseStudyIds[0]);
      dispatch(setCaseStudyId(id?.casestudyid as number));
    }
  }, [caseStudyIds, data, dispatch]);

  return (
    <FormElement>
      <FormSelectInput
        name="casestudyid"
        options={caseStudyIds}
        value={
          getSelectedCaseStudyName(data as ICaseStudyData[], id as number)
            ?.casetitle
        }
        onSelect={handleSelectChange}
      />
    </FormElement>
  );
};
