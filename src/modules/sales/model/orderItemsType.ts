/**
 * Represents a generic product.
 */
export interface ProductType {
    id: string;
    name: string;
}

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
 * Represents the kernel data required for the order items forms.
 */
export interface KernelData {
    products: OptionType[];
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
 * Represents the order data within an order item.
 */
export interface OrderData {
    customer: string;
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
 * Data Transfer Object for creating a new order item.
 */
export interface CreateOrderItemDto {
    product: string;
    weight: number;
    number: number;
    order: OrderData;
}

/**
 * Represents an order item entity as returned by the API.
 */
export interface OrderItem extends CreateOrderItemDto {
    id: string;
    create: DateUserBlock;
}

/**
 * Represents the response for a list of order items.
 */
export interface OrderItemsResponse {
    data: OrderItem[];
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