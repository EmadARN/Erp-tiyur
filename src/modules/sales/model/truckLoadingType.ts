/**
 * Represents a generic car.
 */
export interface CarType {
    id: string;
    car_number: string;
}

/**
 * Represents a generic driver.
 */
export interface DriverType {
    id: string;
    contact: {
        name: string;
    };
}

/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the truck loading forms.
 */
export interface KernelData {
    cars: OptionType[];
    drivers: OptionType[];
}

/**
 * Represents a date and user block.
 */
export interface DateUserBlock {
    date: string;
    user: string;
}

/**
 * Represents a weight block.
 */
export interface WeightBlock {
    weight: number;
    date: DateUserBlock;
}

/**
 * Represents a cancellation block.
 */
export interface CancelBlock {
    status: boolean;
    user_date: DateUserBlock;
}

/**
 * Data Transfer Object for creating a new truck loading.
 */
export interface CreateTruckLoadingDto {
    car: {
        driver: string;
        car: string;
    };
}

/**
 * Represents a truck loading entity as returned by the API.
 */
export interface TruckLoading extends CreateTruckLoadingDto {
    id: string;
    create_at: DateUserBlock;
    level: string;
    first_weight: WeightBlock;
    last_weight: WeightBlock;
    buyer: string;
    entrance_date: DateUserBlock;
    exit_date: DateUserBlock;
    is_cancelled: CancelBlock;
}

/**
 * Represents the response for a list of truck loadings.
 */
export interface TruckLoadingsResponse {
    data: TruckLoading[];
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