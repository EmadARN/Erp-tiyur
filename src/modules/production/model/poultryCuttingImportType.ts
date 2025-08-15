/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the poultry cutting import forms.
 */
export interface KernelData {
  products: OptionType[];
  product_owners: OptionType[];
  dispatch_units: OptionType[];
  users: OptionType[];
  statuses: OptionType[];
}

/**
 * Represents the product information.
 */
export interface Product {
  product: number;
  product_owner: number;
}

/**
 * Represents the product details.
 */
export interface ProductInformation {
  weight: number;
  number: number;
}

/**
 * Represents the create or status information.
 */
export interface CreateInfo {
  date: string;
  user: string;
}

/**
 * Represents the dispatch, verified, or cancelled information.
 */
export interface StatusInfo {
  status: boolean;
  user_date: CreateInfo;
}

/**
 * Represents the poultry cutting production series information.
 */
export interface PoultryCuttingProductionSeries {
  product_owner: string;
  create: CreateInfo;
  start: CreateInfo;
  finished: CreateInfo;
  status: string;
}

/**
 * Data Transfer Object for creating a new poultry cutting import.
 */
export interface CreatePoultryCuttingImportDto {
  product: Product;
  product_information: ProductInformation;
  dispatch_unit: string;
  poultry_cutting_production_series: PoultryCuttingProductionSeries;
}

/**
 * Represents a poultry cutting import entity as returned by the API.
 */
export interface PoultryCuttingImport extends CreatePoultryCuttingImportDto {
  id: string;
  production_status: string;
  dispatch: StatusInfo;
  verified: StatusInfo;
  cancelled: StatusInfo;
  create_date: CreateInfo;
}

/**
 * Represents the response for a list of poultry cutting imports.
 */
export interface PoultryCuttingImportsResponse {
  data: PoultryCuttingImport[];
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

export interface Filter {
  type: "range" | "range-box" | "switch" | "select-box" | "autocomplete" | "multi-select";
  name: string;
  value: FilterValue;
}

/**
 * Represents a record of filters.
 */
export type FiltersRecord = Record<string, Filter>;