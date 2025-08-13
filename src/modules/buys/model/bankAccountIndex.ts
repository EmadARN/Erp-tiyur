import type { TableColumn, TableFilter, ConfigItem } from "@/modules/shared/types";
import type { BankAccount } from "./bankAccount";

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Owner Name", row_id: "owner_name", type: "string" },
    { columnName: "Account Number", row_id: "account_number", type: "string" },
];

export function getCreateDialogConfigs(): ConfigItem[] {
    return [
        { name: "owner_name", label: "Owner Name", type: "string-input", defaultValue: "", required: true },
        { name: "account_number", label: "Account Number", type: "string-input", defaultValue: "", required: true },
    ];
}

export function getUpdateDialogConfigs(): ConfigItem[] {
    return [
        { name: "owner_name", label: "Owner Name", type: "string-input", defaultValue: "", required: true },
        { name: "account_number", label: "Account Number", type: "string-input", defaultValue: "", required: true },
    ];
}

export const updateDialogDocs: Partial<BankAccount> = {
    id: "",
    owner_name: "",
    account_number: "",
};

export const tableFilter: TableFilter[] = [
    { name: "owner_name", label: "Owner Name", type: "autocomplete", options: [], placeholder: "Search owner", defaultValue: "" },
    { name: "account_number", label: "Account Number", type: "autocomplete", options: [], placeholder: "Search account number", defaultValue: "" },
];
