export interface CreateBankAccountDto {
    owner_name: string;
    account_number: string;
}

export interface BankAccount extends CreateBankAccountDto {
    id: string;
}

export interface BankAccountsResponse {
    data: BankAccount[];
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
