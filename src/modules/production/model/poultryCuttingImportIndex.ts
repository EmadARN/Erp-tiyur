import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { PoultryCuttingImport, KernelData } from "./poultryCuttingImportType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Product", row_id: "product.product.name", type: "number" },
    { columnName: "Product Owner", row_id: "product.product_owner.contact.name", type: "number" },
    { columnName: "Weight", row_id: "product_information.weight", type: "number" },
    { columnName: "Quantity", row_id: "product_information.number", type: "number" },
    { columnName: "Production Status", row_id: "production_status", type: "string" },
    { columnName: "Dispatch Unit", row_id: "dispatch_unit", type: "string" },
    { columnName: "Dispatch Status", row_id: "dispatch.status", type: "boolean" },
    { columnName: "Verification Status", row_id: "verified.status", type: "boolean" },
    { columnName: "Cancellation Status", row_id: "cancelled.status", type: "boolean" },
    { columnName: "Creation Date", row_id: "create_date.date", type: "string" },
    { columnName: "Production Series Status", row_id: "poultry_cutting_production_series.status", type: "string" },
];

export function getCreateDialogConfigs({ products, owners }: KernelData): ConfigItem[] {
    return [
        {
            name: "product.product",
            label: "Product",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "product.product_owner",
            label: "Product Owner",
            type: "select-box",
            options: owners,
            defaultValue: owners?.[0]?.value,
            required: true,
        },
        {
            name: "product_information.weight",
            label: "Weight",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "dispatch_unit",
            label: "Dispatch Unit",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "product_information.number",
            label: "Quantity",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.product_owner",
            label: "Production Series Owner",
            type: "select-box",
            options: owners,
            defaultValue: owners?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.status",
            label: "Production Series Status",
            type: "select-box",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Started", value: "started" },
                { label: "Finished", value: "finished" },
            ],
            defaultValue: "pending",
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({ products, owners }: KernelData): ConfigItem[] {
    return [
        {
            name: "product.product",
            label: "Product",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "product.product_owner",
            label: "Product Owner",
            type: "select-box",
            options: owners,
            defaultValue: owners?.[0]?.value,
            required: true,
        },
        {
            name: "product_information.weight",
            label: "Weight",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "product_information.number",
            label: "Quantity",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "production_status",
            label: "Production Status",
            type: "select-box",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Started", value: "started" },
                { label: "Finished", value: "finished" },
            ],
            defaultValue: "pending",
            required: true,
        },
        {
            name: "dispatch_unit",
            label: "Dispatch Unit",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "dispatch.status",
            label: "Dispatch Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "dispatch.user_date.date",
            label: "Dispatch Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "dispatch.user_date.user",
            label: "Dispatch User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "verified.status",
            label: "Verification Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "verified.user_date.date",
            label: "Verification Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "verified.user_date.user",
            label: "Verification User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "cancelled.status",
            label: "Cancellation Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "cancelled.user_date.date",
            label: "Cancellation Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "cancelled.user_date.user",
            label: "Cancellation User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "create_date.date",
            label: "Creation Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "create_date.user",
            label: "Creation User",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "poultry_cutting_production_series.product_owner",
            label: "Production Series Owner",
            type: "select-box",
            options: owners,
            defaultValue: owners?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.create.date",
            label: "Production Series Creation Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.create.user",
            label: "Production Series Creation User",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.start.date",
            label: "Production Series Start Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.start.user",
            label: "Production Series Start User",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.finished.date",
            label: "Production Series Finish Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.finished.user",
            label: "Production Series Finish User",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.status",
            label: "Production Series Status",
            type: "select-box",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Started", value: "started" },
                { label: "Finished", value: "finished" },
            ],
            defaultValue: "pending",
            required: true,
        },
    ];
}
export const updateDialogDocs = {
    "id": "162",
    "product": {
        "product": 0,
        "product_owner": 0
    },
    "product_information": {
        "weight": 0,
        "number": 0
    },
    "production_status": "pending",
    "dispatch_unit": "",
    "dispatch": {
        "status": false,
        "user_date": {
            "date": "2025-08-18 05:16",
            "user": "string"
        }
    },
    "verified": {
        "status": false,
        "user_date": {
            "date": "2025-08-18 05:16",
            "user": "string"
        }
    },
    "cancelled": {
        "status": false,
        "user_date": {
            "date": "2025-08-18 05:16",
            "user": "string"
        }
    },
    "create_date": {
        "date": "2025-08-18 05:16",
        "user": "string"
    },
    "poultry_cutting_production_series": {
        "product_owner": "",
        "create": {
            "date": "2025-08-18 05:16",
            "user": "string"
        },
        "start": {
            "date": "2025-08-18 05:16",
            "user": "string"
        },
        "finished": {
            "date": "2025-08-18 05:16",
            "user": "string"
        },
        "status": "pending"
    }
}
export const tableFilter: TableFilter[] = [
    {
        name: "product__product",
        label: "Product",
        type: "autocomplete",
        options: [],
        placeholder: "Search Product",
        defaultValue: "",
    },
    {
        name: "product__product_owner",
        label: "Product Owner",
        type: "autocomplete",
        options: [],
        placeholder: "Search Product Owner",
        defaultValue: "",
    },
    {
        name: "product_information__weight",
        label: "Weight",
        type: "range",
        min: 0,
        max: 1000,
        step: 1,
        defaultValue: [0, 500],
    },
    {
        name: "product_information__number",
        label: "Quantity",
        type: "range",
        min: 0,
        max: 1000,
        step: 1,
        defaultValue: [0, 500],
    },
    {
        name: "production_status",
        label: "Production Status",
        type: "select-box",
        options: [],
        defaultValue: "pending",
    },
    {
        name: "dispatch_unit",
        label: "Dispatch Unit",
        type: "autocomplete",
        options: [],
        placeholder: "Search Dispatch Unit",
        defaultValue: "",
    },
    {
        name: "dispatch__status",
        label: "Dispatch Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "verified__status",
        label: "Verification Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "cancelled__status",
        label: "Cancellation Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "create_date__date",
        label: "Creation Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "poultry_cutting_production_series__status",
        label: "Production Series Status",
        type: "select-box",
        options: [],
        defaultValue: "pending",
    },
];
