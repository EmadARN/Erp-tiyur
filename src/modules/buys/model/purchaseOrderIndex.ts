import type { TableColumn, TableFilter } from "@/modules/shared/types";
import type { PurchaseOrder } from "./purchaseOrderTypes";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
  { columnName: "ID", row_id: "id", type: "string" },
  { columnName: "Status", row_id: "status", type: "string" },
  { columnName: "Product Name", row_id: "product.product_name", type: "string" },
  { columnName: "Quantity", row_id: "product.quantity", type: "number" },
  { columnName: "Unit", row_id: "product.unit", type: "string" },
  { columnName: "Required Deadline", row_id: "required_deadline", type: "string" },
];

export const getCreateDialogConfigs = (): any[] => [
  { name: "product.product_name", label: "Product Name", type: "string-input", defaultValue: "", required: true },
  { name: "product.quantity", label: "Quantity", type: "int-input", defaultValue: 0, required: true },
  { name: "product.unit", label: "Unit", type: "string-input", defaultValue: "", required: true },
  { name: "required_deadline", label: "Required Deadline", type: "string-input", defaultValue: "", required: true },
];

export const getUpdateDialogConfigs = (): any[] => [
  ...getCreateDialogConfigs(),
  { name: "status", label: "Status", type: "string-input", defaultValue: "", required: true },
  { name: "estimated_price", label: "Estimated Price", type: "int-input", defaultValue: 0, required: false },
  { name: "final_price", label: "Final Price", type: "int-input", defaultValue: 0, required: false },
  { name: "planned_purchase_date", label: "Planned Purchase Date", type: "string-input", defaultValue: "", required: false },
  { name: "have_factor", label: "Have Factor", type: "switch", defaultValue: false, required: false },
];

export const updateDialogDocs: DeepPartial<PurchaseOrder> = {
  id: "",
  product: {
    product_name: "",
    quantity: 0,
    unit: "",
  },
  required_deadline: "",
  status: "",
  estimated_price: 0,
  created_at: { date: "", user: "" },
  approved_by_finance: { user_date: { date: "", user: "" }, status: false, description: "" },
  approved_by_purchaser: { user_date: { date: "", user: "" }, status: false, description: "" },
  purchased: { user_date: { date: "", user: "" }, status: false, description: "" },
  received: { user_date: { date: "", user: "" }, status: false, description: "" },
  cancelled: { user_date: { date: "", user: "" }, status: false, description: "" },
  done: { user_date: { date: "", user: "" }, status: false, description: "" },
  final_price: 0,
  planned_purchase_date: "",
  have_factor: false,
};

export const tableFilter: TableFilter[] = [
  { name: "status", label: "Status", type: "autocomplete", options: [], defaultValue: "" },
  { name: "product__product_name", label: "Product Name", type: "autocomplete", options: [], defaultValue: "" },
];
