/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the production import from warehouse forms.
 */
export interface KernelData {
    warehouse_units: OptionType[];
    products: OptionType[];
    product_owners: OptionType[];
    users: OptionType[];
    statuses: OptionType[];
}

/**
 * Represents the product description information.
 */
export interface ProductDescription {
    warehouse_unit: string;
    product: {
        product: number;
        product_owner: number;
    };
}

/**
 * Represents the product information.
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
 * Data Transfer Object for creating a new production import from warehouse.
 */
export interface CreateProductionImportFromWarehouseDto {
    product_description: ProductDescription;
    product_information: ProductInformation;
    production_series: ProductionSeries;
}

/**
 * Represents a production import from warehouse entity as returned by the API.
 */
export interface ProductionImportFromWarehouse extends CreateProductionImportFromWarehouseDto {
    id: string;
    level: number;
    is_verified: VerifiedInfo;
    is_planned: VerifiedInfo;
    is_cancelled: VerifiedInfo;
    create_date: CreateInfo;
    production_start_date: CreateInfo;
    production_finished_date: CreateInfo;
}

/**
 * Represents the response for a list of production imports from warehouse.
 */
export interface ProductionImportsFromWarehouseResponse {
    data: ProductionImportFromWarehouse[];
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