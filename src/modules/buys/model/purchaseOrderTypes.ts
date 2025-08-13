export interface StatusBlock {
  user_date: {
    date: string;
    user: string;
  };
  status: boolean;
  description: string;
}

export interface ProductInfo {
  product_name: string;
  quantity: number;
  unit: string;
}

export interface CreatePurchaseOrderDto {
  product: ProductInfo;
  required_deadline: string;
}

export interface PurchaseOrder extends CreatePurchaseOrderDto {
  id: string;
  status: string;
  estimated_price: number;
  created_at: { date: string; user: string };
  approved_by_finance: StatusBlock;
  approved_by_purchaser: StatusBlock;
  purchased: StatusBlock;
  received: StatusBlock;
  cancelled: StatusBlock;
  done: StatusBlock;
  final_price: number;
  planned_purchase_date: string;
  have_factor: boolean;
}

export interface PurchaseOrdersResponse {
  data: PurchaseOrder[];
}

// 🎯 دقیق کردن value بر اساس type
export interface RangeFilter {
  type: "range" | "range-box";
  name: string;
  value: [number, number];
}

export interface SwitchFilter {
  type: "switch";
  name: string;
  value: boolean;
}

export interface SelectBoxFilter {
  type: "select-box";
  name: string;
  value: string | number;
}

export interface AutocompleteFilter {
  type: "autocomplete";
  name: string;
  value: string;
}

export interface MultiSelectFilter {
  type: "multi-select";
  name: string;
  value: (string | number)[];
}

// اتحاد همه فیلترها
export type Filter =
  | RangeFilter
  | SwitchFilter
  | SelectBoxFilter
  | AutocompleteFilter
  | MultiSelectFilter;

export type FiltersRecord = Record<string, Filter>;
