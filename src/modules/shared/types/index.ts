import type { store } from "../store/store"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


//Update Dialogs:
export type OptionType = { value: string; label: string };
export interface ConfigItem {
    name: string;
    label: string;
    type: "string-input" | "select-box" | "switch" | "multi-select";
    defaultValue?: any;
    options?: OptionType[] | string[];
    required?: string
}