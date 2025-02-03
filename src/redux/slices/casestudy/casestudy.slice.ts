import { createSlice } from "@reduxjs/toolkit";
import { initialAsyncData } from "../../../models/constants";
import { caseStudyReducer, extraCaseStudyReducer } from "./casestudy.reducer";
import { ICaseStudyState } from "./casestudy.type";

export const initialState: ICaseStudyState = {
  caseStudy: initialAsyncData,
  selectedCaseStudyId: undefined,
};

export const caseStudySlice = createSlice({
  name: "caseStudy",
  initialState,
  reducers: caseStudyReducer,
  extraReducers: extraCaseStudyReducer,
});

export const { setCaseStudyId } = caseStudySlice.actions;
