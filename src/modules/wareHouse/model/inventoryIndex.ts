import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { Inventory, KernelData } from "./inventoryTypes";

// A utility type to make all properties of an object, including nested ones, optional.
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: "Product", row_id: "product.product.name", type: "string" },
  { columnName: "Product Owner", row_id: "product.product_owner.contact.name", type: "string" },
  { columnName: "Production Date", row_id: "shelf_life.production_date", type: "string" },
  { columnName: "Expire Date", row_id: "shelf_life.expire_date", type: "string" },
  { columnName: "Warehouse", row_id: "warehouse.name", type: "string" },
];

export function getCreateDialogConfigs({
  products,
  owners
 
}: KernelData): ConfigItem[] {
  return [
    {
      name: "product.product",
      label: "Product",
      type: "select-box",
      options: products,
      defaultValue: products?.[0]?.value,
      required: true,
    },
    {
      name: "product.product_owner",
      label: "Product Owner",
      type: "select-box",
      options: owners,
      defaultValue: owners?.[0]?.value,
      required: true,
    },
    {
      name: "shelf_life.production_date",
      label: "Production Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "shelf_life.expire_date",
      label: "Expire Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "shelf_life.is_perishable",
      label: "Is Perishable",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "warehouse.name",
      label: "Warehouse",
     
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "warehouse.is_active",
      label: "Is Active",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "warehouse.description",
      label: "Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "warehouse.is_production_warehouse",
      label: "Is Production Warehouse",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "warehouse.create_date.date",
      label: "Warehouse Create Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "warehouse.create_date.user",
      label: "Warehouse Create User",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
  ];
}

export function getUpdateDialogConfigs({
  products,
 owners,
 
}: KernelData): ConfigItem[] {
  return [
    {
      name: "product.product",
      label: "Product",
      type: "select-box",
      options: products,
      defaultValue: products?.[0]?.value,
      required: true,
    },
    {
      name: "product.product_owner",
      label: "Product Owner",
      type: "select-box",
      options: owners,
      defaultValue: owners?.[0]?.value,
      required: true,
    },
    {
      name: "shelf_life.production_date",
      label: "Production Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "shelf_life.expire_date",
      label: "Expire Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "shelf_life.is_perishable",
      label: "Is Perishable",
      type: "switch",
      defaultValue: true,
      required: true,
    },
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
      name: "warehouse.name",
      label: "Warehouse",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "warehouse.is_active",
      label: "Is Active",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "warehouse.description",
      label: "Description",
      type: "string-input",
      defaultValue: "",
      required: false,
    },
    {
      name: "warehouse.is_production_warehouse",
      label: "Is Production Warehouse",
      type: "switch",
      defaultValue: true,
      required: true,
    },
    {
      name: "warehouse.create_date.date",
      label: "Warehouse Create Date",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
    {
      name: "warehouse.create_date.user",
      label: "Warehouse Create User",
      type: "string-input",
      defaultValue: "",
      required: true,
    },
  ];
}

export const updateDialogDocs: DeepPartial<Inventory> = {
  id: "125",
  product: {
    product: "string",
    product_owner: "string"
  },
  shelf_life: {
    production_date: "string",
    expire_date: "string",
    is_perishable: true
  },
  quantity: {
    weight: 0,
    number: 0,
    is_weight_base: true
  },
  warehouse: {
    name: "string",
    is_active: true,
    description: "",
    is_production_warehouse: true,
    create_date: {
      date: "2025-08-13 23:09",
      user: "string"
    }
  }
};

export const tableFilter: TableFilter[] = [
  {
    name: "product__product",
    label: "Product",
    type: "autocomplete",
    options: [], // Populate dynamically from API
    placeholder: "Search product",
    defaultValue: "",
  },
  {
    name: "product__product_owner",
    label: "Product Owner",
    type: "autocomplete",
    options: [], // Populate dynamically from API
    placeholder: "Search product owner",
    defaultValue: "",
  },
  {
    name: "shelf_life__production_date",
    label: "Production Date",
    type: "range",
    defaultValue: ["2025-01-01", "2025-12-31"],
  },
  {
    name: "shelf_life__expire_date",
    label: "Expire Date",
    type: "range",
    defaultValue: ["2025-01-01", "2025-12-31"],
  },
  {
    name: "shelf_life__is_perishable",
    label: "Is Perishable",
    type: "boolean",
    defaultValue: true,
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
    name: "warehouse__name",
    label: "Warehouse",
    type: "autocomplete",
    options: [], // Populate dynamically from API
    placeholder: "Search warehouse",
    defaultValue: "",
  },
  {
    name: "warehouse__is_active",
    label: "Is Active",
    type: "boolean",
    defaultValue: true,
  },
  {
    name: "warehouse__is_production_warehouse",
    label: "Is Production Warehouse",
    type: "boolean",
    defaultValue: true,
  },
];