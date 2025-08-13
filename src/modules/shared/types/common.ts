export type OptionType = {
  value: string | number;
  label: string;
};

export type InputTypes = "string-input" | "int-input" | "float-input";

export type ConfigItemType =
  | "string-input"
  | "int-input"
  | "float-input"
  | "select-box"
  | "switch"
  | "multi-select";

export interface ConfigItem {
  name: string;
  label: string;
  type: ConfigItemType;
  defaultValue?: string | number | boolean | string[];
  options?: OptionType[];
  required?: boolean;
  fullWidth?: boolean;
}
