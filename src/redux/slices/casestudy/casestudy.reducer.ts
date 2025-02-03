import { fetchData } from "../../../services/axios";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "../../../services/axiosServices";
import { ICaseStudyData, ICaseStudyState } from "./casestudy.type";

export const fetchAllCaseStudyAsync = createAsyncThunk(
  "profile/getAllCaseStudy",
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await fetchData(authService.getAllCaseStudy);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const caseStudyReducer = {
  setCaseStudyId: (
    state: ICaseStudyState,
    { payload }: PayloadAction<number>
  ): void => {
    state.selectedCaseStudyId = payload;
  },
};

export const extraCaseStudyReducer = {
  [fetchAllCaseStudyAsync.pending.type]: (state: ICaseStudyState) => {
    state.caseStudy.loading = true;
  },
  [fetchAllCaseStudyAsync.fulfilled.type]: (
    state: ICaseStudyState,
    { payload }: PayloadAction<Array<ICaseStudyData>>
  ) => {
    state.caseStudy.loading = false;
    state.caseStudy.data = payload;
  },
  [fetchAllCaseStudyAsync.rejected.type]: (state: ICaseStudyState) => {
    state.caseStudy.loading = false;
    state.caseStudy.error = "Error while fetching customer data";
  },
};
