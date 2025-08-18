import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { ProductionExport, KernelData } from "./productionExportType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Product", row_id: "product.name", type: "string" },
    { columnName: "Receiver Delivery Unit", row_id: "receiver_delivery_unit", type: "string" },
    { columnName: "Weight", row_id: "product_information.weight", type: "number" },
    { columnName: "Quantity", row_id: "product_information.number", type: "number" },
    { columnName: "Creation Date", row_id: "create.date", type: "string" },
    { columnName: "Verification Status", row_id: "is_verified_by_receiver_delivery_unit_user.status", type: "boolean" },
    { columnName: "Production Series Product Owner", row_id: "production_series.product_owner.contact.name", type: "number" },
    { columnName: "Production Series Status", row_id: "production_series.status", type: "string" },
];

export function getCreateDialogConfigs({ products, owners }: KernelData): ConfigItem[] {
    return [
        {
            name: "product",
            label: "Product",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "receiver_delivery_unit",
            label: "Receiver Delivery Unit",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
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
            label: "Production Series Product Owner",
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
            name: "product",
            label: "Product",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
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
            name: "create.date",
            label: "Creation Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "create.user",
            label: "Creator User",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "is_verified_by_receiver_delivery_unit_user.status",
            label: "Verification Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "is_verified_by_receiver_delivery_unit_user.user_date.date",
            label: "Verification Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "is_verified_by_receiver_delivery_unit_user.user_date.user",
            label: "Verifier User",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "production_series.product_owner",
            label: "Production Series Product Owner",
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
            label: "Production Series Creator",
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
            label: "Production Series Starter",
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
            label: "Production Series Finisher",
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

export const updateDialogDocs: DeepPartial<ProductionExport> = {
    id: "462",
    product: "",
    receiver_delivery_unit: "",
    product_information: {
        weight: 0,
        number: 0,
    },
    create: {
        date: "2025-08-14 10:26",
        user: "",
    },
    is_verified_by_receiver_delivery_unit_user: {
        status: false,
        user_date: {
            date: "2025-08-14 10:26",
            user: "",
        },
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
        name: "product",
        label: "Product",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Product",
        defaultValue: "",
    },
    {
        name: "receiver_delivery_unit",
        label: "Receiver Delivery Unit",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Receiver Delivery Unit",
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
        name: "create__date",
        label: "Creation Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "is_verified_by_receiver_delivery_unit_user__status",
        label: "Verification Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "production_series__product_owner",
        label: "Production Series Product Owner",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Product Owner",
        defaultValue: "",
    },
    {
        name: "production_series__status",
        label: "Production Series Status",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
];
