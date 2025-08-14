/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common"; 

/**
 * Represents the kernel data required for the inventory forms.
 */
export interface KernelData {
    products: OptionType[];
    owners: OptionType[];
    warehouses: OptionType[];
    
}

/**
 * Represents a date block for creation.
 */
export interface CreateDate {
    date: string;
    user: string;
}

/**
 * Data Transfer Object for creating a new inventory.
 */
export interface CreateInventoryDto {
    product: {
        product: string;
        product_owner: string;
    };
    shelf_life: {
        production_date: string;
        expire_date: string;
        is_perishable: boolean;
    };
    warehouse: {
        name: string;
        is_active: boolean;
        description: string;
        is_production_warehouse: boolean;
        create_date: CreateDate;
    };
}

/**
 * Represents an inventory entity as returned by the API.
 */
export interface Inventory extends CreateInventoryDto {
    id: string;
    quantity: {
        weight: number;
        number: number;
        is_weight_base: boolean;
    };
}

/**
 * Represents the response for a list of inventories.
 */
export interface InventoryResponse {
    data: Inventory[];
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
  type: "range" | "range-box" | "switch" | "select-box" | "autocomplete" | "multi-select";
  name: string;
  value: FilterValue;
}

/**
 * Represents a record of filters.
 */
export type FiltersRecord = Record<string, Filter>;