/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the planning series forms.
 */
export interface KernelData {
    users: OptionType[];
}

/**
 * Represents the create information for a planning series.
 */
export interface CreateInfo {
    date: string;
    user: string;
}

/**
 * Data Transfer Object for creating a new planning series.
 */
export interface CreatePlanningSeriesDto {
    is_finished: boolean;
}

/**
 * Represents a planning series entity as returned by the API.
 */
export interface PlanningSeries extends CreatePlanningSeriesDto {
    id: string;
    create: CreateInfo;
}

/**
 * Represents the response for a list of planning series.
 */
export interface PlanningSeriesResponse {
    data: PlanningSeries[];
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