/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the production return product forms.
 */
export interface KernelData {
    receiver_delivery_units: OptionType[];
    products: OptionType[];
    product_owners: OptionType[];
    return_types: OptionType[];
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
 * Represents the product information details.
 */
export interface ProductInformation {
    weight: number;
    number: number;
}

/**
 * Represents the date and user information.
 */
export interface CreateInfo {
    date: string;
    user: string;
}

/**
 * Represents the verification information.
 */
export interface VerifiedInfo {
    status: boolean;
    user_date: CreateInfo;
}

/**
 * Represents the production series information.
 */
export interface ProductionSeries {
    create: CreateInfo;
    start: CreateInfo;
    finish: CreateInfo;
    product_owner: number;
    status: string;
}

/**
 * Data Transfer Object for creating a new production return product.
 */
export interface CreateProductionReturnProductDto {
    receiver_delivery_unit: string;
    product: Product;
    product_information: ProductInformation;
    return_type: string;
}

/**
 * Represents a production return product entity as returned by the API.
 */
export interface ProductionReturnProduct extends CreateProductionReturnProductDto {
    id: string;
    create: CreateInfo;
    verified: VerifiedInfo;
    is_useful: boolean;
    is_repack: boolean;
    production_series: ProductionSeries;
}

/**
 * Represents the response for a list of production return products.
 */
export interface ProductionReturnProductsResponse {
    data: ProductionReturnProduct[];
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