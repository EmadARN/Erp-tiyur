import type { store } from "../store/store";
import { OptionType } from "./common";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InputTypes = "string-input" | "int-input" | "float-input";

export type ConfigItem = import("./common").ConfigItem;

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
  label: string;
  name: string;
  max?: number;
  min?: number;
  step?: number;
  placeholder?: string;
  defaultValue?: any;
  type: ColumnType;
  options?: OptionType[];
};


export type TableColumn = {
  columnName: string;
  row_id: string;
  type: ColumnType;
  onClick?: (row: any) => void;
  options?: OptionType[];
};
