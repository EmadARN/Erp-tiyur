import type {
  TableColumn,
  TableFilter,
  ConfigItem,
} from "@/modules/shared/types";

export const tableHead: TableColumn[] = [
  { columnName: "Prefix Number", row_id: "prefix_number", type: "number" },
  { columnName: "Alphabet", row_id: "alphabet", type: "string" },
  { columnName: "Postfix Number", row_id: "postfix_number", type: "number" },
  { columnName: "City", row_id: "city_code.name", type: "string" },
  { columnName: "Has Refrigerator", row_id: "has_refrigerator", type: "switch" },
  { columnName: "Product Category", row_id: "product_category.name", type: "string" },
  { columnName: "Slug", row_id: "slug", type: "string" },
  { columnName: "Repetitive", row_id: "repetitive", type: "switch" },
  { columnName: "Driver", row_id: "driver.contact.name", type: "string" },
];

export function getCreateDialogConfigs({
                                         cities,
                                         categories,
                                         drivers,
                                       }: any): ConfigItem[] {
  return [
    {
      name: "prefix_number",
      label: "Prefix Number",
      type: "int-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "alphabet",
      label: "Alphabet",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "postfix_number",
      label: "Postfix Number",
      type: "int-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "city_code",
      label: "City",
      type: "select-box",
      options: cities,
      defaultValue: cities?.[0]?.value,
      required: true,
    },
    {
      name: "has_refrigerator",
      label: "Has Refrigerator",
      type: "switch",
      defaultValue: false,
      required: true,
    },
    {
      name: "product_category",
      label: "Product Category",
      type: "select-box",
      options: categories,
      defaultValue: categories?.[0]?.value,
      required: true,
    },
    {
      name: "repetitive",
      label: "Repetitive",
      type: "switch",
      defaultValue: false,
      required: true,
    },
    {
      name: "driver",
      label: "Driver",
      type: "select-box",
      options: drivers,
      defaultValue: drivers?.[0]?.value,
      required: true,
    },
  ];
}

export function getUpdateDialogConfigs({
                                         cities,
                                         categories,
                                         drivers,
                                       }: any): ConfigItem[] {
  return getCreateDialogConfigs({ cities, categories, drivers });
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
