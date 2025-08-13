export interface CarInfo {
    driver: string;
    car: string;
  }
  
  export interface LoadedProductCar {
    car: CarInfo;
    create_at: { date: string; user: string };
    level: string;
    first_weight: { weight: number; date: { date: string; user: string } };
    last_weight: { weight: number; date: { date: string; user: string } };
    buyer: string;
    entrance_date: { date: string; user: string };
    exit_date: { date: string; user: string };
    is_cancelled: { status: boolean; user_date: { date: string; user: string } };
  }
  
  export interface ProductInfo {
    product: string;
    product_owner: string;
  }
  
  export interface LoadedProduct {
    id: string;
    product: ProductInfo;
    created: { date: string; user: string };
    price: number;
    car: LoadedProductCar;
    is_weight_base: boolean;
  }
  
  export interface CreateLoadedProductDto extends LoadedProduct {}
  
  export interface LoadedProductsResponse {
    data: LoadedProduct[];
  }
  
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
  
  export type FiltersRecord = Record<string, Filter>;
  