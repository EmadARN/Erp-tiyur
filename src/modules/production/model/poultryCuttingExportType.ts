/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the poultry cutting export forms.
 */
export interface KernelData {
    products: OptionType[];
    product_owners: OptionType[];
    receiver_delivery_units: OptionType[];
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
 * Represents the create information.
 */
export interface CreateInfo {
    date: string;
    user: string;
}

/**
 * Represents the verified information.
 */
export interface VerifiedInfo {
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
 * Data Transfer Object for creating a new poultry cutting export.
 */
export interface CreatePoultryCuttingExportDto {
    product: Product;
    product_information: ProductInformation;
    receiver_delivery_unit: string;
    poultry_cutting_production_series: PoultryCuttingProductionSeries;
}

/**
 * Represents a poultry cutting export entity as returned by the API.
 */
export interface PoultryCuttingExport extends CreatePoultryCuttingExportDto {
    id: string;
    create: CreateInfo;
    verified: VerifiedInfo;
}

/**
 * Represents the response for a list of poultry cutting exports.
 */
export interface PoultryCuttingExportsResponse {
    data: PoultryCuttingExport[];
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