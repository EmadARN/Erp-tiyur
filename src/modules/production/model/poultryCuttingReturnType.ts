/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the poultry cutting return forms.
 */
export interface KernelData {
    products: OptionType[];
    product_owners: OptionType[];
    receiver_delivery_units: OptionType[];
    users: OptionType[];
    return_types: OptionType[];
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
 * Data Transfer Object for creating a new poultry cutting return.
 */
export interface CreatePoultryCuttingReturnDto {
    product: Product;
    product_information: ProductInformation;
    return_type: string;
    receiver_delivery_unit: string;
    poultry_cutting_production_series: PoultryCuttingProductionSeries;
}

/**
 * Represents a poultry cutting return entity as returned by the API.
 */
export interface PoultryCuttingReturn extends CreatePoultryCuttingReturnDto {
    id: string;
    create: CreateInfo;
    verified: VerifiedInfo;
    is_useful: boolean;
    is_repack: boolean;
    is_verified_by_receiver_delivery_unit_user: boolean;
}

/**
 * Represents the response for a list of poultry cutting returns.
 */
export interface PoultryCuttingReturnsResponse {
    data: PoultryCuttingReturn[];
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