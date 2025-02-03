import { useMemo } from "react";
import { useParams } from "react-router";
import { CaseStudyImage } from "../../components/CaseStudy/Image";
import { ComingSoon } from "../../components/ComingSoon";
import { caseStudies } from "../../redux/slices/casestudy/casestudy.selector";
import { ICaseStudyData } from "../../redux/slices/casestudy/casestudy.type";
import { useAppSelector } from "../../redux/store";
import { IF } from "../../ui-kits/IF";
import { PageWidth } from "../../ui-kits/PageWidth";
import { SectionHeader } from "../../ui-kits/Sections/SectionHeader/SectionHeader";
import { SectionWrapper } from "../../ui-kits/Sections/SectionWrapper/SectionWrapper";
import { Spinner } from "../../ui-kits/Spinner/Spinner.component";
import { filterItems } from "../../utils/generics";
import { isEmpty } from "../../utils/script";
import { decodeUrl } from "../../utils/text";

export const CaseStudy = () => {
  const { id: caseId } = useParams();
  const { data, loading } = useAppSelector(caseStudies);

  const filteredData = useMemo(() => {
    let computedData: ICaseStudyData[] = data || [];

    if (caseId && data) {
      computedData = filterItems(data, {
        casecategory: decodeUrl(caseId),
      });
    }
    return computedData[0];
  }, [data, caseId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <SectionWrapper isbordered>
      <PageWidth isNarrow>
        <IF condition={!isEmpty(filteredData)}>
          <SectionHeader
            heading={filteredData?.casetitle}
            subHeading={filteredData?.casedescription}
          />
          <CaseStudyImage imagesData={filteredData?.gallery} />
        </IF>
        <IF condition={isEmpty(filteredData)}>
          <ComingSoon />
        </IF>
      </PageWidth>
    </SectionWrapper>
  );
};
