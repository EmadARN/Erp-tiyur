import type {
  TableColumn,
  TableFilter,
  ConfigItem,
} from "@/modules/shared/types";

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: "City Name", row_id: "name", type: "string" },
  { columnName: "Cities Car Code", row_id: "car_code", type: "number" },
];

export function getCreateDialogConfigs(): ConfigItem[] {
  return [
    {
      name: "name",
      label: "city Name",
      type: "string-input",
      defaultValue: "znj",
      required: true,
    },
    {
      name: "car_code",
      label: "Cities Car Code",
      type: "int-input",
      defaultValue: 1,
      required: true,
    },

  ];
}

export function getUpdateDialogConfigs(): ConfigItem[] {
  return [
    {
      name: "name",
      label: "city Name",
      type: "string-input",
      defaultValue: "znj",
      required: true,
    },
    {
      name: "car_code",
      label: "Cities Car Code",
      type: "int-input",
      defaultValue: 1,
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
