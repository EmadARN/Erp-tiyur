/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the production export forms.
 */
export interface KernelData {
    products: OptionType[];
    receiver_delivery_units: OptionType[];
    product_owners: OptionType[];
    users: OptionType[];
    statuses: OptionType[];
}

/**
 * Represents the product information.
 */
export interface ProductInformation {
    weight: number;
    number: number;
}

/**
 * Represents the create, start, or finish information.
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
 * Data Transfer Object for creating a new production export.
 */
export interface CreateProductionExportDto {
    product: string;
    receiver_delivery_unit: string;
    product_information: ProductInformation;
    production_series: ProductionSeries;
}

/**
 * Represents a production export entity as returned by the API.
 */
export interface ProductionExport extends CreateProductionExportDto {
    id: string;
    create: CreateInfo;
    is_verified_by_receiver_delivery_unit_user: VerifiedInfo;
}

/**
 * Represents the response for a list of production exports.
 */
export interface ProductionExportsResponse {
    data: ProductionExport[];
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