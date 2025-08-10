import type { store } from "../store/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Update Dialogs:
export type OptionType = { value: string; label: string };
export interface ConfigItem {
  name: string;
  label: string;
  type: "string-input" | "select-box" | "switch" | "multi-select";
  defaultValue?: any;
  options?: OptionType[] | string[];
  required?: string;
}

type ColumnType =
  | "string"
  | "button"
  | "input"
  | "select"
  | "checkbox"
  | "range"
  | "multi-select"
  | "autocomplete"
  | "select-box"
  | "switch"
  | "range-box";



export type TableFilter = {
  label?: string;
  name?: string;
  max?: number;
  min?: number;
  step?: number;
  placeholder?: string;
  defaultValue?: any;
  type: ColumnType;
  options?:string[]
};


export type TableColumn = {
    columnName: string;
    row_id: string;
    type: ColumnType;
    onClick?: (row: any) => void;
    options?: string[];
  };
