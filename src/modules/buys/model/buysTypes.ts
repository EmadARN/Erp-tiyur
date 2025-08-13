

export interface ProductType {
    id: number | string;
    name: string;
}

export interface OwnerType {
    id: number | string;
    contact: {
        name: string;
    };
}

export interface CarType {
    id: number | string;
    car_number: string;
}

export interface DriverType {
    id: number | string;
    contact: {
        name: string;
    };
}

export interface AgricultureType {
    id: number | string;
    name: string;
}
// گزینه‌ها برای select ها
export interface Option {
    label: string;
    value: string;
}

// دیتای کمکی برای فرم‌ها
export interface KernelData {
    cars: Option[];
    agriculture: Option[];
    drivers: Option[];
    owners: Option[];
    products: Option[];
}

// وضعیت مراحل
export interface StatusBlock {
    user_date: {
        date: string;
        user: string;
    };
    status: boolean;
    description: string;
}

export interface PostProduct {
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

export interface GetProduct extends PostProduct {
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

export interface OrdersResponse {
    data: GetProduct[];
}

export type BuyProduct = GetProduct;

export interface ProductDetails {
    id: string;
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


type FilterType =
    | { type: "range" | "range-box"; name: string; value: [number, number] }
    | { type: "switch" | "select-box" | "autocomplete"; name: string; value: string | number | boolean }
    | { type: "multi-select"; name: string; value: (string | number)[] };

export type FiltersRecord = Record<string, FilterType>;
