import type {
  TableColumn,
  TableFilter,
  ConfigItem,
} from "@/modules/shared/types";

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: " UserName", row_id: "username", type: "string" },
  { columnName: "First Name", row_id: "first_name", type: "string" },
  { columnName: "Last Name", row_id: "last_name", type: "string" },
  { columnName: "Email", row_id: "email", type: "string" },
];

export function getCreateDialogConfigs({ roles }: any): ConfigItem[] {
  return [
    {
      name: "username",
      label: "User Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "first_name",
      label: "First Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "string-input",
      defaultValue: "",
      required: true,
    },

    {
      name: "roles",
      label: "Roles",
      type: "multi-select",
      options: roles,
      defaultValue: roles?.[0]?.value,
      required: true,
    },
  ];
}

export function getUpdateDialogConfigs({ roles }: any): ConfigItem[] {
  return [
    {
      name: "username",
      label: "User Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "first_name",
      label: "First Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "string-input",
      defaultValue: "",
      required: true,
    },

    {
      name: "roles",
      label: "Roles",
      type: "multi-select",
      options: roles,
      defaultValue: roles?.[0]?.value,
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
