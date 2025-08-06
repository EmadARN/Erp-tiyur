import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    isSettingsDrawerOpen: boolean;
}

const initialState: UIState = {
    isSettingsDrawerOpen: false,
};

const settingsSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openSettingsDrawer: (state) => {
            state.isSettingsDrawerOpen = true;
        },
        closeSettingsDrawer: (state) => {
            state.isSettingsDrawerOpen = false;
        },
        toggleSettingsDrawer: (state) => {
            state.isSettingsDrawerOpen = !state.isSettingsDrawerOpen;
        },
    },
});

export const {
    openSettingsDrawer,
    closeSettingsDrawer,
    toggleSettingsDrawer,
} = settingsSlice.actions;

export default settingsSlice.reducer;
