import type {
  TableColumn,
  TableFilter,
  ConfigItem,
} from "@/modules/shared/types";

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: " name", row_id: "name", type: "string" },
];

export function getCreateDialogConfigs(): ConfigItem[] {
  return [
    {
      name: "name",
      label: "agriculture Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },

  ];
}

export function getUpdateDialogConfigs(): ConfigItem[] {
  return [
    {
      name: "name",
      label: "agriculture Name",
      type: "string-input",
      defaultValue: "",
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
