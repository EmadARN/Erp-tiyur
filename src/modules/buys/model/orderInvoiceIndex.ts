import type { TableColumn, TableFilter, ConfigItem } from "@/modules/shared/types";
import type { OrderInvoice } from "./orderInvoice";

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Purchase Date", row_id: "purchase_date", type: "string" },
    { columnName: "Invoice Number", row_id: "invoice_number", type: "string" },
    { columnName: "Title", row_id: "title", type: "string" },
    { columnName: "Seller Name", row_id: "seller.name", type: "string" },
    { columnName: "Is Paid", row_id: "is_paid", type: "boolean" },
];

export function getCreateDialogConfigs(): ConfigItem[] {
    return [
        { name: "purchase_date", label: "Purchase Date", type: "string-input", defaultValue: "", required: true },
        { name: "invoice_number", label: "Invoice Number", type: "string-input", defaultValue: "", required: true },
        { name: "title", label: "Title", type: "string-input", defaultValue: "", required: true },
        { name: "description", label: "Description", type: "string-input", defaultValue: "", required: false },
        { name: "seller.name", label: "Seller Name", type: "string-input", defaultValue: "", required: true },
        { name: "seller.bank_account", label: "Seller Bank Account", type: "string-input", defaultValue: "", required: true },
    ];
}

export function getUpdateDialogConfigs(): ConfigItem[] {
    return getCreateDialogConfigs();
}

export const updateDialogDocs: Partial<OrderInvoice> = {
    id: "",
    purchase_date: "",
    invoice_number: "",
    title: "",
    description: "",
    seller: { name: "", bank_account: "" },
    is_paid: false,
    product_list: [],
    created_at: { date: "", user: "" },
};

export const tableFilter: TableFilter[] = [
    { name: "invoice_number", label: "Invoice Number", type: "autocomplete", options: [], placeholder: "Search invoice", defaultValue: "" },
    { name: "title", label: "Title", type: "autocomplete", options: [], placeholder: "Search title", defaultValue: "" },
    { name: "seller.name", label: "Seller Name", type: "autocomplete", options: [], placeholder: "Search seller", defaultValue: "" },
    { name: "is_paid", label: "Is Paid", type: "boolean", defaultValue: false },
];
