/**
 * Represents a generic product.
 */
export interface ProductType {
    id: string;
    name: string;
}

/**
 * Represents a generic owner.
 */
export interface OwnerType {
    id: string;
    contact: {
        name: string;
    };
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
 * Represents a generic agriculture entity.
 */
export interface AgricultureType {
    id: string;
    name: string;
}

/**
 * Represents an option for a select input.
 */
import { OptionType } from "@/modules/shared/types/common";

/**
 * Represents the kernel data required for the buy product forms.
 */
export interface KernelData {
    cars: OptionType[];
    agriculture: OptionType[];
    drivers: OptionType[];
    owners: OptionType[];
    products: OptionType[];
}

/**
 * Represents the status of a step in a process.
 */
export interface StatusBlock {
    user_date: {
        date: string;
        user: string;
    };
    status: boolean;
    description: string;
}

/**
 * Data Transfer Object for creating a new buy product.
 */
export interface CreateBuyProductDto {
    car: {
        car: string;
        driver: string;
    };
    order_information: {
        agriculture: string;
        product_owner: string;
        slaughter_type: string;
        order_type: string;
        product: string;
    };
    required_weight: number;
    required_number: number;
}

/**
 * Represents a buy product entity as returned by the API.
 */
export interface BuyProduct extends CreateBuyProductDto {
    id: string;
    weight: number;
    quality: string;
    status: string;
    create: {
        date: string;
        user: string;
    };
    verified: StatusBlock;
    received: StatusBlock;
    finished: StatusBlock;
    done: StatusBlock;
    cancelled: StatusBlock;
    price: {
        purchase_price_per_unit: number;
        cost_price: number;
        transportation_price: number;
    };
}

/**
 * Represents the response for a list of buy products.
 */
export interface OrdersResponse {
    data: BuyProduct[];
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
