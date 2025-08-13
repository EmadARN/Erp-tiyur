export interface CreateOrderPaymentDto {
    amount: number;
    payment_type: string;
    from_account: {
        owner_name: string;
        account_number: string;
    };
    to_account: {
        owner_name: string;
        account_number: string;
    };
    payment_description: string;
}

export interface OrderPayment extends CreateOrderPaymentDto {
    id: string;
    created_at: {
        date: string;
        user: string;
    };
    invoice: any;
}

export interface OrderPaymentsResponse {
    data: OrderPayment[];
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
