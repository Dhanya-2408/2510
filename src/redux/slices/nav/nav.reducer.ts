import { PayloadAction } from "@reduxjs/toolkit";
import { CountryEnum } from "../../../models/enums";
import { INavState } from "./nav.type";

export const navReducer = {
  setCountry: (
    state: INavState,
    { payload }: PayloadAction<CountryEnum>
  ): void => {
    state.country = payload;
  },
};
