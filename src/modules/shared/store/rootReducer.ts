import { combineReducers } from '@reduxjs/toolkit'
import { salesApi } from '@/modules/sales/api/salesApi'
import uiSettingsReducer from './slice/settingsSlice';
import themeReducer from './slice/themeSlice';

export const rootReducer = combineReducers({
    [salesApi.reducerPath]: salesApi.reducer,
    uiSetting: uiSettingsReducer,
    theme: themeReducer,

})
