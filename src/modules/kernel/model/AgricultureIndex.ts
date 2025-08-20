import type {
  TableColumn,
  TableFilter,
  ConfigItem,
} from "@/modules/shared/types";

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: " name", row_id: "name", type: "string" },
  { columnName: " city", row_id: "city.name", type: "string" },
];

export function getCreateDialogConfigs({ cities }: any): ConfigItem[] {
  return [
    {
      name: "name",
      label: "agriculture Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "city",
      label: "City",
      type: "select-box",
      options: cities,
      defaultValue: cities?.[0]?.value,
      required: true,
    },
  ];
}

export function getUpdateDialogConfigs({ cities }: any): ConfigItem[] {
  return [
    {
      name: "name",
      label: "agriculture Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "city",
      label: "City",
      type: "select-box",
      options: cities,
      defaultValue: cities?.[0]?.value,
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
