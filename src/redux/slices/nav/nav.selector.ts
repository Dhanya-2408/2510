import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const navSelf = (state: RootState) => state.nav;

export const country = createSelector(
  navSelf,
  (state) => state && state.country
);
