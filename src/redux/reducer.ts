import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { caseStudySlice } from "./slices/casestudy/casestudy.slice";
import { navSlice } from "./slices/nav/nav.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
  // blacklist: [caseStudySlice.name],
};

const rootReducer = combineReducers({
  [navSlice.name]: navSlice.reducer,
  [caseStudySlice.name]: caseStudySlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
