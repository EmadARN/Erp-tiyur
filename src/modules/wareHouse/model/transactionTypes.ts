/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common"; 

/**
 * Represents the kernel data required for the transaction forms.
 */
export interface KernelData {
  products: OptionType[];
  product_owners: OptionType[];
  warehouses: OptionType[];
}

/**
 * Represents a date block for creation and verification.
 */
export interface DateInfo {
  date: string;
  user: string;
}

/**
 * Data Transfer Object for creating a new transaction.
 */
export interface CreateTransactionDto {
  quantity: {
    weight: number;
    number: number;
    is_weight_base: boolean;
  };
  is_import: boolean;
  inventory: {
    product: {
      product: string;
      product_owner: string;
    };
    shelf_life: {
      production_date: string;
      expire_date: string;
      is_perishable: boolean;
    };
    quantity: {
      weight: number;
      number: number;
      is_weight_base: boolean;
    };
    warehouse: {
      name: string;
      is_active: boolean;
      description: string;
      is_production_warehouse: boolean;
      create_date: DateInfo;
    };
  };
  storage_location: string;
  description: string;
}

/**
 * Represents a transaction entity as returned by the API.
 */
export interface Transaction extends CreateTransactionDto {
  id: string;
  is_verified: {
    status: boolean;
    user_date: DateInfo;
  };
  create_date: DateInfo;
}

/**
 * Represents the response for a list of transactions.
 */
export interface TransactionResponse {
  data: Transaction[];
}

/**
 * Represents a filter type for the data table.
 */
export type FilterValue =
  | [number, number]
  | string
  | number
  | boolean
  | (string | number)[];

/**
 * Represents a filter.
 */
export interface Filter {
  type: "range" | "range-box" | "switch" | "select-box" | "autocomplete" | "multi-select" | "boolean";
  name: string;
  value: FilterValue;
}

/**
 * Represents a record of filters.
 */
export type FiltersRecord = Record<string, Filter>;