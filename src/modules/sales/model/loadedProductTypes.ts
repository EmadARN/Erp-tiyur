/**
 * Represents a generic product.
 */
export interface ProductType {
  id: string;
  name: string;
}

/**
 * Represents a generic product owner.
 */
export interface ProductOwnerType {
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
 * Represents the kernel data required for the loaded product forms.
 */
export interface KernelData {
  products: OptionType[];
  productOwners: OptionType[];
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
 * Represents the car data within a loaded product.
 */
export interface CarData {
  car: {
    driver: string;
    car: string;
  };
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
 * Data Transfer Object for creating a new loaded product.
 */
export interface CreateLoadedProductDto {
  product: {
    product: string;
    product_owner: string;
  };
  price: number;
  car: CarData;
  is_weight_base: boolean;
}

/**
 * Represents a loaded product entity as returned by the API.
 */
export interface LoadedProduct extends CreateLoadedProductDto {
  id: string;
  created: DateUserBlock;
}

/**
 * Represents the response for a list of loaded products.
 */
export interface LoadedProductsResponse {
  data: LoadedProduct[];
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