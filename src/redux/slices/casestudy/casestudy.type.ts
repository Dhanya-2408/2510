import { AsyncData } from "../../../models/types";

export interface ICaseStudyContent {
  content: string;
  contentid: number;
  casestudyid: number;
}

export interface ICaseStudyImage {
  gallerytitle: string;
  imageurl: string;
  galleryid: number;
  casestudyid: number;
}

export interface ICaseStudyData {
  casedescription: string;
  casestudyid: number;
  casetitle: string;
  casecategory: string;
  content: ICaseStudyContent[];
  gallery: ICaseStudyImage[];
}

export interface ICaseStudyState {
  caseStudy: AsyncData<Array<ICaseStudyData>>;
  selectedCaseStudyId: undefined | number;
}
