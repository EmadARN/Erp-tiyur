export interface CreateContactDto {
  owner_name: string;
  account_number: string;
}

export interface Contact extends CreateContactDto {
  id: string;
}

export interface ContactsResponse {
  data: Contact[];
}

// فیلترها با value مشخص
export interface RangeFilter {
  type: "range" | "range-box";
  name: string;
  value: [number, number];
}

export interface SwitchFilter {
  type: "switch";
  name: string;
  value: boolean;
}

export interface SelectBoxFilter {
  type: "select-box";
  name: string;
  value: string | number;
}

export interface AutocompleteFilter {
  type: "autocomplete";
  name: string;
  value: string;
}

export interface MultiSelectFilter {
  type: "multi-select";
  name: string;
  value: (string | number)[];
}

// اتحاد همه فیلترها
export type Filter =
  | RangeFilter
  | SwitchFilter
  | SelectBoxFilter
  | AutocompleteFilter
  | MultiSelectFilter;

export type FiltersRecord = Record<string, Filter>;
