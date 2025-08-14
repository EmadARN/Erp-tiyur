import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { Transaction, KernelData } from "./transactionTypes";

// A utility type to make all properties of an object, including nested ones, optional.
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: "Product", row_id: "inventory.product.product.name", type: "string" },
  { columnName: "Product Owner", row_id: "inventory.product.product_owner.contact.name", type: "string" },
  { columnName: "Warehouse", row_id: "inventory.warehouse.name", type: "string" },
  { columnName: "Quantity", row_id: "quantity.number", type: "number" },
  { columnName: "Is Import", row_id: "is_import", type: "boolean" },
  { columnName: "Storage Location", row_id: "storage_location", type: "string" },
];

export function getCreateDialogConfigs({
  products,
  owners,

}: KernelData): ConfigItem[] {
  return [
    {
      name: "quantity.weight",
      label: "Weight",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "quantity.number",
      label: "Number",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "quantity.is_weight_base",
      label: "Is Weight Based",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "is_import",
      label: "Is Import",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.product.product",
      label: "Product",
      type: "select-box",
      options: products,
      defaultValue: products?.[0]?.value,
      required: true,
    },
    {
      name: "inventory.product.product_owner",
      label: "Product Owner",
      type: "select-box",
      options:owners,
      defaultValue: owners?.[0]?.value,
      required: true,
    },
    {
      name: "inventory.shelf_life.production_date",
      label: "Production Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "inventory.shelf_life.expire_date",
      label: "Expire Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "inventory.shelf_life.is_perishable",
      label: "Is Perishable",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.quantity.weight",
      label: "Inventory Weight",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "inventory.quantity.number",
      label: "Inventory Number",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "inventory.quantity.is_weight_base",
      label: "Inventory Is Weight Based",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.warehouse.name",
      label: "Warehouse",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "inventory.warehouse.is_active",
      label: "Is Active",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.warehouse.description",
      label: "Warehouse Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "inventory.warehouse.is_production_warehouse",
      label: "Is Production Warehouse",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.warehouse.create_date.date",
      label: "Warehouse Create Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "inventory.warehouse.create_date.user",
      label: "Warehouse Create User",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "storage_location",
      label: "Storage Location",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "description",
      label: "Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
  ];
}

export function getUpdateDialogConfigs({
  products,
 owners,

}: KernelData): ConfigItem[] {
  return [
    {
      name: "quantity.weight",
      label: "Weight",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "quantity.number",
      label: "Number",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "quantity.is_weight_base",
      label: "Is Weight Based",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "is_verified.status",
      label: "Is Verified",
      type: "switch",
      defaultValue: false,
      required: true,
    },
    {
      name: "is_verified.user_date.date",
      label: "Verification Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "is_verified.user_date.user",
      label: "Verification User",
      type: "string-input",
      defaultValue: "",
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
    {
      name: "is_import",
      label: "Is Import",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.product.product",
      label: "Product",
      type: "select-box",
      options: products,
      defaultValue: products?.[0]?.value,
      required: true,
    },
    {
      name: "inventory.product.product_owner",
      label: "Product Owner",
      type: "select-box",
      options: owners,
      defaultValue: owners?.[0]?.value,
      required: true,
    },
    {
      name: "inventory.shelf_life.production_date",
      label: "Production Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "inventory.shelf_life.expire_date",
      label: "Expire Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "inventory.shelf_life.is_perishable",
      label: "Is Perishable",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.quantity.weight",
      label: "Inventory Weight",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "inventory.quantity.number",
      label: "Inventory Number",
      type: "int-input",
      defaultValue: 0,
      required: false,
    },
    {
      name: "inventory.quantity.is_weight_base",
      label: "Inventory Is Weight Based",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.warehouse.name",
      label: "Warehouse",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "inventory.warehouse.is_active",
      label: "Is Active",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.warehouse.description",
      label: "Warehouse Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "inventory.warehouse.is_production_warehouse",
      label: "Is Production Warehouse",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "inventory.warehouse.create_date.date",
      label: "Warehouse Create Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "inventory.warehouse.create_date.user",
      label: "Warehouse Create User",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "storage_location",
      label: "Storage Location",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "description",
      label: "Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
  ];
}

export const updateDialogDocs: DeepPartial<Transaction> = {
  id: "134",
  quantity: {
    weight: 0,
    number: 0,
    is_weight_base: true,
  },
  is_verified: {
    status: false,
    user_date: {
      date: "2025-08-14 09:06",
      user: "string",
    },
  },
  create_date: {
    date: "2025-08-14 09:06",
    user: "string",
  },
  is_import: true,
  inventory: {
    product: {
      product: "string",
      product_owner: "string",
    },
    shelf_life: {
      production_date: "string",
      expire_date: "string",
      is_perishable: true,
    },
    quantity: {
      weight: 0,
      number: 0,
      is_weight_base: true,
    },
    warehouse: {
      name: "string",
      is_active: true,
      description: "",
      is_production_warehouse: true,
      create_date: {
        date: "2025-08-14 09:06",
        user: "string",
      },
    },
  },
  storage_location: "",
  description: "",
};

export const tableFilter: TableFilter[] = [
  {
    name: "inventory__product__product",
    label: "Product",
    type: "autocomplete",
    options: [],
    placeholder: "Search product",
    defaultValue: "",
  },
  {
    name: "inventory__product__product_owner",
    label: "Product Owner",
    type: "autocomplete",
    options: [],
    placeholder: "Search product owner",
    defaultValue: "",
  },
  {
    name: "inventory__warehouse__name",
    label: "Warehouse",
    type: "autocomplete",
    options: [],
    placeholder: "Search warehouse",
    defaultValue: "",
  },
  {
    name: "quantity__weight",
    label: "Weight",
    type: "range",
    min: 0,
    max: 10000,
    step: 10,
    defaultValue: [0, 5000],
  },
  {
    name: "quantity__number",
    label: "Number",
    type: "range",
    min: 0,
    max: 1000,
    step: 1,
    defaultValue: [0, 500],
  },
  {
    name: "quantity__is_weight_base",
    label: "Is Weight Based",
    type: "boolean",
    defaultValue: true,
  },
  {
    name: "is_import",
    label: "Is Import",
    type: "boolean",
    defaultValue: true,
  },
  {
    name: "is_verified__status",
    label: "Is Verified",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "create_date__date",
    label: "Create Date",
    type: "range-date",
    defaultValue: ["2025-01-01", "2025-12-31"],
  },
];