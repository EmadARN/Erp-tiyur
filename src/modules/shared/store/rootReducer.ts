import { combineReducers } from '@reduxjs/toolkit'
import { salesApi } from '@/modules/sales/api/salesApi'
import uiSettingsReducer from './slice/settingsSlice';

export const rootReducer = combineReducers({
    [salesApi.reducerPath]: salesApi.reducer,
    uiSetting: uiSettingsReducer,
})
