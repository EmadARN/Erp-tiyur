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
  
  export type FilterValue =
    | [number, number]
    | string
    | number
    | boolean
    | (string | number)[];
  
  export interface Filter {
    type: "range" | "range-box" | "switch" | "select-box" | "autocomplete" | "multi-select";
    name: string;
    value: FilterValue;
  }
  
  export type FiltersRecord = Record<string, Filter>;
  