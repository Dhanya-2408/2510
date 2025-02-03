import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const caseStudySelf = (state: RootState) => state.caseStudy;

export const caseStudies = createSelector(
  [caseStudySelf],
  (state) => state.caseStudy
);

export const caseStudyId = createSelector(
  [caseStudySelf],
  (state) => state.selectedCaseStudyId
);
