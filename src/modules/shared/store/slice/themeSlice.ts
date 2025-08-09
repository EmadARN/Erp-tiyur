import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";
export type PresetColor = "blue" | "green" | "purple" | "orange";
export type FontFamily = "Public Sans" | "Inter" | "DM Sans" | "Nunito Sans";
export type SidebarColor = "white" | "rgb(16,24,40)";

interface ThemeState {
    mode: ThemeMode;
    preset: PresetColor;
    font: FontFamily;
    fontSize: number;
    direction: "ltr" | "rtl";
    sidebarColor: SidebarColor;
}

const initialState: ThemeState = {
    mode: (localStorage.getItem("themeMode") as ThemeMode) || "light",
    preset: (localStorage.getItem("presetColor") as PresetColor) || "blue",
    font: (localStorage.getItem("fontFamily") as FontFamily) || "Inter",
    fontSize: Number(localStorage.getItem("fontSize")) || 16,
    direction: (localStorage.getItem("direction") as "ltr" | "rtl") || "ltr",
    sidebarColor:
        (localStorage.getItem("sidebarColor") as SidebarColor) || "white",
};

const defaultState: ThemeState = {
    mode: "light",
    preset: "blue",
    font: "Inter",
    fontSize: 16,
    direction: "ltr",
    sidebarColor: "white",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
            localStorage.setItem("themeMode", action.payload);
        },
        toggleMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("themeMode", state.mode);
        },
        setPreset: (state, action: PayloadAction<PresetColor>) => {
            state.preset = action.payload;
            localStorage.setItem("presetColor", action.payload);
        },
        setFont: (state, action: PayloadAction<FontFamily>) => {
            state.font = action.payload;
            localStorage.setItem("fontFamily", action.payload);
        },
        setFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload;
            localStorage.setItem("fontSize", String(action.payload));
        },
        setDirection: (state, action: PayloadAction<"ltr" | "rtl">) => {
            state.direction = action.payload;
            localStorage.setItem("direction", action.payload);
        },
        setSidebarColor: (state, action: PayloadAction<SidebarColor>) => {
            state.sidebarColor = action.payload;
            localStorage.setItem("sidebarColor", action.payload);
        },

        // 🔹 ریست کردن همه تنظیمات به مقدار پیش‌فرض
        resetTheme: () => {
            ["themeMode", "presetColor", "fontFamily", "fontSize", "direction", "sidebarColor"].forEach(key =>
                localStorage.removeItem(key)
            );
            return defaultState;
        },
    },
});

export const {
    setMode,
    toggleMode,
    setPreset,
    setFont,
    setFontSize,
    setDirection,
    setSidebarColor,
    resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
