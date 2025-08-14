import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { KernelData, LoadedProductItem } from "./loadedProductItemsTypes";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: "Weight", row_id: "weight", type: "number" },
  { columnName: "Number", row_id: "number", type: "number" },
  { columnName: "Product", row_id: "loaded_product.product.product.name", type: "string" },
  { columnName: "Product Owner", row_id: "loaded_product.product.product_owner.contact.name", type: "string" },
];

export const getCreateDialogConfigs = (): any[] => [
  { name: "weight", label: "Weight", type: "int-input", defaultValue: 0, required: true },
  { name: "number", label: "Number", type: "int-input", defaultValue: 0, required: true },
];
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
      name: "weight",
      label: "Weight",
      type: "int-input",
      defaultValue: 0,
      required: true,
    },
    {
      name: "number",
      label: "Number",
      type: "int-input",
      defaultValue: 0,
      required: true,
    },
  ];
}



export const updateDialogDocs: DeepPartial<LoadedProductItem> = {
  id: "",
  weight: 0,
  number: 0,
  loaded_product: {
    product: { product: "", product_owner: "" },
    created: { date: "", user: "" },
    price: 0,
    car: {
      car: { driver: "", car: "" },
      create_at: { date: "", user: "" },
      level: "",
      first_weight: { weight: 0, date: { date: "", user: "" } },
      last_weight: { weight: 0, date: { date: "", user: "" } },
      buyer: "",
      entrance_date: { date: "", user: "" },
      exit_date: { date: "", user: "" },
      is_cancelled: { status: false, user_date: { date: "", user: "" } },
    },
    is_weight_base: false,
  },
};

export const tableFilter: TableFilter[] = [
  { name: "loaded_product__product__product", label: "Product", type: "autocomplete", options: [], defaultValue: "" },
  { name: "loaded_product__product__product_owner", label: "Product Owner", type: "autocomplete", options: [], defaultValue: "" },
];
