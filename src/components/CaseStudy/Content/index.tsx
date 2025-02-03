import { ICaseStudyContent } from "../../../redux/slices/casestudy/casestudy.type";
import { PageContent } from "../../../ui-kits/Wrappers/PageContent.styles";
import "./Style.scss";

interface IProps {
  contentData?: ICaseStudyContent[];
}

export const CaseStudyContent = (props: IProps) => {
  const { contentData } = props;

  return (
    <PageContent isLarge>
      <div className="Grid">
        {contentData?.map((item: ICaseStudyContent) => (
          <div className="Grid__Cell" key={item.contentid}>
            <div
              className=" CaseStudyCard"
              data-aos="zoom-in"
              data-aos-once="true"
              data-aos-duration="1500"
            >
              <span className="Heading CaseStudyCard__Id u-h6">
                CaseStudy - {item.contentid}
              </span>
              <p className="Text--subdued">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </PageContent>
  );
};
