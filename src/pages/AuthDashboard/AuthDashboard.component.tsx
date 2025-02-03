import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { DashboardWrapper } from "./AuthDashboard.styles";
import { AdminTopnav } from "../../components/AdminDashboard/topnav/topnav.component";
import SidebarLg from "../../components/AdminDashboard/sidebar-lg/sidebar-lg.component";
import SidebarSm from "../../components/AdminDashboard/sidebar-sm/sidebar-sm.component";
import { fetchAllCaseStudyAsync } from "../../redux/slices/casestudy/casestudy.reducer";
import { AddCaseStudy } from "../../components/CasestudyCRUD/CaseStudy/AddCaseStudy";
import { Container } from "../../ui-kits/Container";
import usePath from "../../custom-hooks/usePath";
import { AdminEnum } from "../../models/enums";
import { AddCaseStudyContent } from "../../components/CasestudyCRUD/Content/AddContent";
import { AddCaseStudyGallery } from "../../components/CasestudyCRUD/Gallery/AddGallery";
import { DeleteCaseStudy } from "../../components/CasestudyCRUD/CaseStudy/DeleteCaseStudy";
import { DeleteCaseStudyContent } from "../../components/CasestudyCRUD/Content/DeleteContent";
import { DeleteCaseStudyGallery } from "../../components/CasestudyCRUD/Gallery/DeleteGallery";
import { UpdateCaseStudy } from "../../components/CasestudyCRUD/CaseStudy/UpdateCaseStudy";
import { UpdateCaseStudyContent } from "../../components/CasestudyCRUD/Content/UpdateContent";
import { UpdateCaseStudyGallery } from "../../components/CasestudyCRUD/Gallery/UpdateGallery";

interface DashboardProps {
  children?: ReactNode;
}

export const AuthDashboard: FC<DashboardProps> = ({
  children,
}: DashboardProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCaseStudyAsync());
  }, [dispatch]);

  const { getSearchParams } = usePath();
  const path = getSearchParams("rc");
  const getFormElement = (elementType: AdminEnum) =>
    ({
      [AdminEnum.addCasestudy]: <AddCaseStudy />,
      [AdminEnum.addCasestudyContent]: <AddCaseStudyContent />,
      [AdminEnum.addCasestudyGallery]: <AddCaseStudyGallery />,
      [AdminEnum.deleteCasestudy]: <DeleteCaseStudy />,
      [AdminEnum.deleteCasestudyContent]: <DeleteCaseStudyContent />,
      [AdminEnum.deleteCasestudyGallery]: <DeleteCaseStudyGallery />,
      [AdminEnum.updateCasestudy]: <UpdateCaseStudy />,
      [AdminEnum.updateCasestudyContent]: <UpdateCaseStudyContent />,
      [AdminEnum.updateCasestudyGallery]: <UpdateCaseStudyGallery />,
    }[elementType]);

  const customElement = getFormElement(
    (path as AdminEnum) || AdminEnum.addCasestudy
  );

  return (
    <DashboardWrapper>
      <main className="dashboard">
        <SidebarSm />
        <SidebarLg />
        <div>
          <AdminTopnav />
          <div className="dashboard-page">
            <Container isExtraNarrow>{customElement}</Container>
          </div>
        </div>
      </main>
    </DashboardWrapper>
  );
};
