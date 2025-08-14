/**
 * Represents a generic customer.
 */
export interface CustomerType {
    id: string;
    name: string;
}

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
 * Represents the kernel data required for the order forms.
 */
export interface KernelData {
    customers: OptionType[];
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
 * Represents a status block.
 */
export interface StatusBlock {
    status: boolean;
    user_date: DateUserBlock;
}

/**
 * Data Transfer Object for creating a new order.
 */
export interface CreateOrderDto {
    customer: string;
}

/**
 * Represents an order entity as returned by the API.
 */
export interface Order extends CreateOrderDto {
    id: string;
    create: DateUserBlock;
    car: {
        driver: string;
        car: string;
    };
    attachment_status: StatusBlock;
    cancelled: StatusBlock;
    verified: StatusBlock;
}

/**
 * Represents the response for a list of orders.
 */
export interface OrdersResponse {
    data: Order[];
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