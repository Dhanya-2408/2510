import { AdminEnum } from "../../../models/enums";

export interface ILink {
  id: number;
  text: string;
  path: AdminEnum;
}

const links: ILink[] = [
  { id: 1, text: "Add CaseStudy", path: AdminEnum.addCasestudy },
  { id: 2, text: "Update CaseStudy", path: AdminEnum.updateCasestudy },
  {
    id: 3,
    text: "Delete CaseStudy",
    path: AdminEnum.deleteCasestudy,
  },
  // { id: 4, text: "Add CaseStudy Content", path: AdminEnum.addCasestudyContent },
  // {
  //   id: 5,
  //   text: "Update CaseStudy Content",
  //   path: AdminEnum.updateCasestudyContent,
  // },
  // {
  //   id: 6,
  //   text: "Delete CaseStudy Content",
  //   path: AdminEnum.deleteCasestudyContent,
  // },
  { id: 7, text: "Add CaseStudy Gallery", path: AdminEnum.addCasestudyGallery },
  {
    id: 8,
    text: "Update CaseStudy Gallery",
    path: AdminEnum.updateCasestudyGallery,
  },
  {
    id: 9,
    text: "Delete CaseStudy Gallery",
    path: AdminEnum.deleteCasestudyGallery,
  },
];

export default links;
