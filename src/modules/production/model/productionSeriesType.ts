/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the production series forms.
 */
export interface KernelData {
    product_owners: OptionType[];
    users: OptionType[];
    statuses: OptionType[];
}

/**
 * Represents the date and user information.
 */
export interface CreateInfo {
    date: string;
    user: string;
}

/**
 * Data Transfer Object for creating a new production series.
 */
export interface CreateProductionSeriesDto {
    product_owner: number;
}

/**
 * Represents a production series entity as returned by the API.
 */
export interface ProductionSeries extends CreateProductionSeriesDto {
    id: string;
    create: CreateInfo;
    start: CreateInfo;
    finish: CreateInfo;
    status: string;
}

/**
 * Represents the response for a list of production series.
 */
export interface ProductionSeriesResponse {
    data: ProductionSeries[];
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