/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the planning cell forms.
 */
export interface KernelData {
    import_types: OptionType[];
    import_ids: OptionType[];
}

/**
 * Data Transfer Object for creating a new planning cell.
 */
export interface CreatePlanningCellDto {
    priority: number;
    import_type: string;
    import_id: string;
}

/**
 * Represents a planning cell entity as returned by the API.
 */
export interface PlanningCell extends CreatePlanningCellDto {
    id: string;
}

/**
 * Represents the response for a list of planning cells.
 */
export interface PlanningCellsResponse {
    data: PlanningCell[];
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