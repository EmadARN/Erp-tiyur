/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the poultry cutting series forms.
 */
export interface KernelData {
    product_owners: OptionType[];
    users: OptionType[];
    statuses: OptionType[];
}

/**
 * Represents the create, start, or finished information.
 */
export interface CreateInfo {
    date: string;
    user: string;
}

/**
 * Data Transfer Object for creating a new poultry cutting series.
 */
export interface CreatePoultryCuttingSeriesDto {
    product_owner: string;
}

/**
 * Represents a poultry cutting series entity as returned by the API.
 */
export interface PoultryCuttingSeries extends CreatePoultryCuttingSeriesDto {
    id: string;
    create: CreateInfo;
    start: CreateInfo;
    finished: CreateInfo;
    status: string;
}

/**
 * Represents the response for a list of poultry cutting series.
 */
export interface PoultryCuttingSeriesResponse {
    data: PoultryCuttingSeries[];
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