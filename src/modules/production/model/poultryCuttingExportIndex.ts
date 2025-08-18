import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { PoultryCuttingExport, KernelData } from "./poultryCuttingExportType";

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Product", row_id: "product.product.name", type: "string" },
    { columnName: "Product Owner", row_id: "product.product_owner.contact.name", type: "string" },
    { columnName: "Weight", row_id: "product_information.weight", type: "number" },
    { columnName: "Quantity", row_id: "product_information.number", type: "number" },
    { columnName: "Receiver Delivery Unit", row_id: "receiver_delivery_unit", type: "string" },
    { columnName: "Created At", row_id: "create.date", type: "string" },
    { columnName: "Created By", row_id: "create.user", type: "string" },
    { columnName: "Verification Status", row_id: "verified.status", type: "boolean" },
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
            name: "product_information.number",
            label: "Quantity",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "receiver_delivery_unit",
            label: "Receiver Delivery Unit",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.product_owner",
            label: "Production Series Product Owner",
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

export function getUpdateDialogConfigs({ products, owners}: KernelData): ConfigItem[] {
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
            name: "receiver_delivery_unit",
            label: "Receiver Delivery Unit",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "create.date",
            label: "Created At",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "create.user",
            label: "Created By",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
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
            label: "Verified At",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "verified.user_date.user",
            label: "Verified By",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "poultry_cutting_production_series.product_owner",
            label: "Production Series Product Owner",
            type: "select-box",
            options: owners,
            defaultValue: owners?.[0]?.value,
            required: true,
        },
        {
            name: "poultry_cutting_production_series.create.date",
            label: "Production Series Created At",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.create.user",
            label: "Production Series Created By",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "poultry_cutting_production_series.start.date",
            label: "Production Series Started At",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.start.user",
            label: "Production Series Started By",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "poultry_cutting_production_series.finished.date",
            label: "Production Series Finished At",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.finished.user",
            label: "Production Series Finished By",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
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

export const updateDialogDocs: DeepPartial<PoultryCuttingExport> = {
    id: "156",
    product: {
        product: 0,
        product_owner: 0,
    },
    product_information: {
        weight: 0,
        number: 0,
    },
    receiver_delivery_unit: "",
    create: {
        date: "2025-08-14 10:26",
        user: "",
    },
    verified: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    poultry_cutting_production_series: {
        product_owner: "",
        create: {
            date: "2025-08-14 10:26",
            user: "",
        },
        start: {
            date: "2025-08-14 10:26",
            user: "",
        },
        finished: {
            date: "2025-08-14 10:26",
            user: "",
        },
        status: "pending",
    },
};

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
        name: "receiver_delivery_unit",
        label: "Receiver Delivery Unit",
        type: "autocomplete",
        options: [],
        placeholder: "Search Receiver Delivery Unit",
        defaultValue: "",
    },
    {
        name: "create__date",
        label: "Created At",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "verified__status",
        label: "Verification Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "poultry_cutting_production_series__status",
        label: "Production Series Status",
        type: "select-box",
        options: [],
        defaultValue: "pending",
    },
];
