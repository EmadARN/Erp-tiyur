import type {
  TableColumn,
  TableFilter,
  ConfigItem,
} from "@/modules/shared/types";

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: "Name", row_id: "name", type: "string" },
  { columnName: "Code", row_id: "code", type: "string" },
  { columnName: "Category", row_id: "category", type: "string" },
];

export function getCreateDialogConfigs({ units, categories }: any): ConfigItem[] {
  return [
    {
      name: "name",
      label: "Product Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "code",
      label: "Product Code",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "category",
      label: "Product Category",
      type: "select-box",
      options: categories,
      defaultValue: categories?.[0]?.value,
      required: true,
    },

    {
      name: "units",
      label: "Units",
      type: "multi-select",
      options: units,
      defaultValue: units?.[0]?.value,
      required: true,
    },
  ];
}

export function getUpdateDialogConfigs({ units , categories}: any): ConfigItem[] {
  return [
    {
      name: "name",
      label: "Product Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "code",
      label: "Product Code",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "category",
      label: "Product Category",
      type: "select-box",
      options: categories,
      defaultValue: categories?.[0]?.value,
      required: true,
    },

    {
      name: "units",
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
