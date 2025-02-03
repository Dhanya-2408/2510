import { createSlice } from "@reduxjs/toolkit";
import { CountryEnum } from "../../../models/enums";
import { navReducer } from "./nav.reducer";
import { INavState } from "./nav.type";

export const initialState: INavState = {
  country: CountryEnum.USA,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: navReducer,
});

export const { setCountry } = navSlice.actions;
