/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common"; 

/**
 * Represents the kernel data required for the warehouse forms.
 */
export interface KernelData {
  users: OptionType[];
}

/**
 * Represents a date block for creation.
 */
export interface DateInfo {
  date: string;
  user: string;
}

/**
 * Data Transfer Object for creating a new warehouse.
 */
export interface CreateWarehouseDto {
  name: string;
  description: string;
  is_production_warehouse: boolean;
}

/**
 * Represents a warehouse entity as returned by the API.
 */
export interface Warehouse extends CreateWarehouseDto {
  id: string;
  is_active: boolean;
  create_date: DateInfo;
}

/**
 * Represents the response for a list of warehouses.
 */
export interface WarehouseResponse {
  data: Warehouse[];
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