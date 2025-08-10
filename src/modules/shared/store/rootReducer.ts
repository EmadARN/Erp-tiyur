import { combineReducers } from "@reduxjs/toolkit";
import { salesApi } from "@/modules/sales/api/salesApi";
import uiSettingsReducer from "./slice/settingsSlice";
import themeReducer from "./slice/themeSlice";
import { LoginApi } from "@/modules/auth/api/Login";
import { buysApi } from "@/modules/buys/api/buyApi";

export const rootReducer = combineReducers({
  [salesApi.reducerPath]: salesApi.reducer,
  [buysApi.reducerPath]: buysApi.reducer,
  [LoginApi.reducerPath]: LoginApi.reducer,
  uiSetting: uiSettingsReducer,
  theme: themeReducer,
});
