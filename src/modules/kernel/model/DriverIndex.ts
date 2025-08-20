import type {
  TableColumn,
  TableFilter,
  ConfigItem,
} from "@/modules/shared/types";

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: " Contact", row_id: "contact.name", type: "string" },
];

export function getCreateDialogConfigs({contacts}): ConfigItem[] {
  return [
    {
      name: "contact",
      label: "Contact",
      type: "select-box",
      options: contacts,
      defaultValue: contacts?.[0].value,
      required: true,
    },
    

  ];
}

export function getUpdateDialogConfigs({ contacts }: any): ConfigItem[] {
  return [
    {
      name: "contact",
      label: "Contact",
      type: "select-box",
      options: contacts,
      defaultValue: contacts?.[0].value,
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
