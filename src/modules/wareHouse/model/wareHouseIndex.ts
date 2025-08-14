import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { Warehouse, KernelData } from "./wareHouseType";

// A utility type to make all properties of an object, including nested ones, optional.
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: "Name", row_id: "name", type: "string" },
  { columnName: "Is Active", row_id: "is_active", type: "boolean" },
  { columnName: "Description", row_id: "description", type: "string" },
  { columnName: "Is Production Warehouse", row_id: "is_production_warehouse", type: "boolean" },
  { columnName: "Create Date", row_id: "create_date.date", type: "string" },
];

export function getCreateDialogConfigs(): ConfigItem[] {
  return [
    {
      name: "name",
      label: "Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "is_production_warehouse",
      label: "Is Production Warehouse",
      type: "switch",
      defaultValue: true,
      required: true,
    },
  ];
}

export function getUpdateDialogConfigs(): ConfigItem[] {
  return [
    {
      name: "name",
      label: "Name",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "is_active",
      label: "Is Active",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "is_production_warehouse",
      label: "Is Production Warehouse",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "create_date.date",
      label: "Create Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "create_date.user",
      label: "Create User",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
  ];
}

export const updateDialogDocs: DeepPartial<Warehouse> = {
  id: "136",
  name: "string",
  is_active: true,
  description: "",
  is_production_warehouse: true,
  create_date: {
    date: "2025-08-14 09:06",
    user: "string",
  },
};

export const tableFilter: TableFilter[] = [
  {
    name: "name",
    label: "Name",
    type: "autocomplete",
    options: [],
    placeholder: "Search warehouse name",
    defaultValue: "",
  },
  {
    name: "is_active",
    label: "Is Active",
    type: "boolean",
    defaultValue: true,
  },
  {
    name: "is_production_warehouse",
    label: "Is Production Warehouse",
    type: "boolean",
    defaultValue: true,
  },
  {
    name: "create_date__date",
    label: "Create Date",
    type: "range-date",
    defaultValue: ["2025-01-01", "2025-12-31"],
  },
];