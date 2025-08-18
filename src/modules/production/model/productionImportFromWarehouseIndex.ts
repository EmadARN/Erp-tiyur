import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { ProductionImportFromWarehouse, KernelData } from "./productionImportFromWarehouseType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Level", row_id: "level", type: "number" },
    { columnName: "Warehouse Unit", row_id: "product_description.warehouse_unit", type: "string" },
    { columnName: "Product", row_id: "product_description.product.product.product.name", type: "number" },
    { columnName: "Product Owner", row_id: "product_description.product.product_owner.contact.name", type: "number" },
    { columnName: "Weight", row_id: "product_information.weight", type: "number" },
    { columnName: "Quantity", row_id: "product_information.number", type: "number" },
    { columnName: "Verified Status", row_id: "is_verified.status", type: "boolean" },
    { columnName: "Planned Status", row_id: "is_planned.status", type: "boolean" },
    { columnName: "Cancelled Status", row_id: "is_cancelled.status", type: "boolean" },
    { columnName: "Production Series Status", row_id: "production_series.status", type: "string" },
];

export function getCreateDialogConfigs({ products, owners }: KernelData): ConfigItem[] {
    return [
        {
            name: "product_description.warehouse_unit",
            label: "Warehouse Unit",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "product_description.product.product",
            label: "Product",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "product_description.product.product_owner",
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
            name: "production_series.product_owner",
            label: "Production Series Owner",
            type: "select-box",
            options: owners,
            defaultValue: owners?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.status",
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
            name: "level",
            label: "Level",
            type: "int-input",
            defaultValue: 1,
            required: true,
        },
        {
            name: "product_description.warehouse_unit",
            label: "Warehouse Unit",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "product_description.product.product",
            label: "Product",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "product_description.product.product_owner",
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
            name: "is_verified.status",
            label: "Verified Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "is_verified.user_date.date",
            label: "Verification Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "is_verified.user_date.user",
            label: "Verified By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "is_planned.status",
            label: "Planned Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "is_planned.user_date.date",
            label: "Planned Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "is_planned.user_date.user",
            label: "Planned By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "is_cancelled.status",
            label: "Cancelled Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "is_cancelled.user_date.date",
            label: "Cancelled Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "is_cancelled.user_date.user",
            label: "Cancelled By",
            type: "string-input",
            defaultValue: "",
            required: true,
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
            label: "Created By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "production_start_date.date",
            label: "Production Start Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "production_start_date.user",
            label: "Production Started By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "production_finished_date.date",
            label: "Production Finished Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "production_finished_date.user",
            label: "Production Finished By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "production_series.product_owner",
            label: "Production Series Owner",
            type: "select-box",
            options: owners,
            defaultValue: owners?.[0]?.value,
            required: true,
        },
        {
            name: "production_series.create.date",
            label: "Production Series Creation Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "production_series.create.user",
            label: "Production Series Created By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "production_series.start.date",
            label: "Production Series Start Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "production_series.start.user",
            label: "Production Series Started By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "production_series.finish.date",
            label: "Production Series Finish Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "production_series.finish.user",
            label: "Production Series Finished By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "production_series.status",
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

export const updateDialogDocs: DeepPartial<ProductionImportFromWarehouse> = {
    id: "159",
    level: 1,
    product_description: {
        warehouse_unit: "",
        product: {
            product: 0,
            product_owner: 0,
        },
    },
    product_information: {
        weight: 0,
        number: 0,
    },
    is_verified: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    is_planned: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    is_cancelled: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
    },
    create_date: {
        date: "2025-08-14 10:26",
        user: "",
    },
    production_start_date: {
        date: "2025-08-14 10:26",
        user: "",
    },
    production_finished_date: {
        date: "2025-08-14 10:26",
        user: "",
    },
    production_series: {
        create: {
            date: "2025-08-14 10:26",
            user: "",
        },
        start: {
            date: "2025-08-14 10:26",
            user: "",
        },
        finish: {
            date: "2025-08-14 10:26",
            user: "",
        },
        product_owner: 0,
        status: "pending",
    },
};

export const tableFilter: TableFilter[] = [
    {
        name: "product_description__warehouse_unit",
        label: "Warehouse Unit",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Warehouse Unit",
        defaultValue: "",
    },
    {
        name: "product_description__product__product",
        label: "Product",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Product",
        defaultValue: "",
    },
    {
        name: "product_description__product__product_owner",
        label: "Product Owner",
        type: "autocomplete",
        options: [], // Populate dynamically from API
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
        name: "is_verified__status",
        label: "Verified Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "is_planned__status",
        label: "Planned Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "is_cancelled__status",
        label: "Cancelled Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "production_series__status",
        label: "Production Series Status",
        type: "select-box",
        options: [], // Populate
    }
    ]