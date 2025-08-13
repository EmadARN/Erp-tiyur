import type { TableColumn, TableFilter, ConfigItem } from "@/modules/shared/types";
import type { OrderPayment } from "./orderPayment";

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Amount", row_id: "amount", type: "number" },
    { columnName: "Payment Type", row_id: "payment_type", type: "string" },
    { columnName: "From Account", row_id: "from_account.owner_name", type: "string" },
    { columnName: "To Account", row_id: "to_account.owner_name", type: "string" },
];

export function getCreateDialogConfigs({invoice}): ConfigItem[] {
    return [
        { name: "amount", label: "Amount", type: "number-input", defaultValue: 0, required: true },
        { name: "payment_type", label: "Payment Type", type: "string-input", defaultValue: "", required: true },
        { name: "from_account.owner_name", label: "From Account Owner", type: "string-input", defaultValue: "", required: true },
        { name: "from_account.account_number", label: "From Account Number", type: "string-input", defaultValue: "", required: true },
        { name: "to_account.owner_name", label: "To Account Owner", type: "string-input", defaultValue: "", required: true },
        { name: "to_account.account_number", label: "To Account Number", type: "string-input", defaultValue: "", required: true },
        { name: "payment_description", label: "Description", type: "string-input", defaultValue: "", required: false },
        {
            name: "invoice",
            label: "invoice",
            type: "select-box",
            options: invoice,
            defaultValue: invoice?.[0]?.value,
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({invoice}): ConfigItem[] {
    return getCreateDialogConfigs({invoice:invoice});
}

export const updateDialogDocs: Partial<OrderPayment> = {
    id: "",
    amount: 0,
    payment_type: "",
    from_account: { owner_name: "", account_number: "" },
    to_account: { owner_name: "", account_number: "" },
    payment_description: "",
    invoice:"",
    created_at: {

        date: "2025-08-13 06:53",
        user: "string"

    },
};

export const tableFilter: TableFilter[] = [
    { name: "payment_type", label: "Payment Type", type: "autocomplete", options: [], placeholder: "Search payment type", defaultValue: "" },
    { name: "from_account.owner_name", label: "From Account Owner", type: "autocomplete", options: [], placeholder: "Search from account", defaultValue: "" },
    { name: "to_account.owner_name", label: "To Account Owner", type: "autocomplete", options: [], placeholder: "Search to account", defaultValue: "" },
];
