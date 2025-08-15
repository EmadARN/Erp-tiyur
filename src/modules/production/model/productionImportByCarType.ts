/**
 * Represents an option for a select input.
 */
import { type OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the production import by car forms.
 */
export interface KernelData {
    cities: OptionType[];
    agricultures: OptionType[];
    drivers: OptionType[];
    cars: OptionType[];
    products: OptionType[];
    product_owners: OptionType[];
    slaughter_types: OptionType[];
    order_types: OptionType[];
    users: OptionType[];
    statuses: OptionType[];
}

/**
 * Represents the agriculture information.
 */
export interface Agriculture {
    city: string;
    agriculture: string;
}

/**
 * Represents the car information.
 */
export interface Car {
    driver: string;
    car: string;
}

/**
 * Represents the product information.
 */
export interface Product {
    product: number;
    product_owner: number;
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
 * Represents the first step information.
 */
export interface FirstStep {
    entrance_to_slaughter: CreateInfo;
}

/**
 * Represents the second step information.
 */
export interface SecondStep {
    full_weight: number;
    source_weight: number;
    cage_number: number;
    product_number_per_cage: number;
}

/**
 * Represents the third step information.
 */
export interface ThirdStep {
    start_production: CreateInfo;
}

/**
 * Represents the fourth step information.
 */
export interface FourthStep {
    finish_production: CreateInfo;
}

/**
 * Represents the fifth step information.
 */
export interface FifthStep {
    empty_weight: number;
    transit_losses_wight: number;
    transit_losses_number: number;
    losses_weight: number;
    losses_number: number;
    fuel: number;
    extra_description: string;
}

/**
 * Represents the sixth step information.
 */
export interface SixthStep {
    exit_from_slaughter: CreateInfo;
}

/**
 * Represents the seventh step information.
 */
export interface SeventhStep {
    product_slaughter_number: number;
    finish: CreateInfo;
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
 * Data Transfer Object for creating a new production import by car.
 */
export interface CreateProductionImportByCarDto {
    agriculture: Agriculture;
    car: Car;
    product: Product;
    slaughter_type: string;
    order_type: string;
    production_series: ProductionSeries;
}

/**
 * Represents a production import by car entity as returned by the API.
 */
export interface ProductionImportByCar extends CreateProductionImportByCarDto {
    id: string;
    level: number;
    first_step: FirstStep;
    second_step: SecondStep;
    third_step: ThirdStep;
    fourth_step: FourthStep;
    fifth_step: FifthStep;
    sixth_step: SixthStep;
    seventh_step: SeventhStep;
    is_planned: VerifiedInfo;
    is_cancelled: VerifiedInfo;
    is_verified: VerifiedInfo;
    create: CreateInfo;
}

/**
 * Represents the response for a list of production imports by car.
 */
export interface ProductionImportsByCarResponse {
    data: ProductionImportByCar[];
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