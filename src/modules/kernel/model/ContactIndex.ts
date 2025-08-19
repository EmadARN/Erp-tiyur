import type {
  TableColumn,
  TableFilter,
  ConfigItem,
} from "@/modules/shared/types";

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: " Name", row_id: "name", type: "string" },
  { columnName: "Slug", row_id: "slug", type: "string" },
];

export function getCreateDialogConfigs({ units }: any): ConfigItem[] {
  return [
    {
      name: "name",
      label: "Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "unit_ids",
      label: "Units",
      type: "multi-select",
      options: units,
      defaultValue: units?.[0]?.value,
      required: true,
    },
  ];
}

export function getUpdateDialogConfigs({ units }: any): ConfigItem[] {
  return [
    {
      name: "name",
      label: " Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "unit_ids",
      label: "Units",
      type: "multi-select",
      options: units,
      defaultValue: units?.[0]?.value,
      required: true,
    },
  ];
}

export const updateDialogDocs = {
  name: "string",
  unit_ids: [],
};

export const tableFilter: TableFilter[] = [
  {
    name: "owner_name",
    label: "Owner Name",
    type: "autocomplete",
    options: [],
    placeholder: "Search owner",
    defaultValue: "",
  },
  {
    name: "account_number",
    label: "Account Number",
    type: "autocomplete",
    options: [],
    placeholder: "Search account number",
    defaultValue: "",
  },
];
