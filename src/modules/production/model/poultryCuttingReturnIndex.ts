import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { PoultryCuttingReturn, KernelData } from "./poultryCuttingReturnType";

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
    { columnName: "Return Type", row_id: "return_type", type: "string" },
    { columnName: "Receiver Delivery Unit", row_id: "receiver_delivery_unit", type: "string" },
    { columnName: "Creation Date", row_id: "create.date", type: "string" },
    { columnName: "Verified Status", row_id: "verified.status", type: "boolean" },
    { columnName: "Usable", row_id: "is_useful", type: "boolean" },
    { columnName: "Repackaging", row_id: "is_repack", type: "boolean" },
    { columnName: "Verified by Delivery Unit", row_id: "is_verified_by_receiver_delivery_unit_user", type: "boolean" },
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
            name: "return_type",
            label: "Return Type",
            type: "select-box",
            options: [
                { label:'return from sales', value:'return from sales' },
                { label:'return from production', value:'return from production' },
                { label:'return from car', value:'return from car' },
            ],
            defaultValue: "return from sales",
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
            label: "Production Series Owner",
            type: "string-input",
            defaultValue: "",
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
            name: "return_type",
            label: "Return Type",
            type: "select-box",
            options: [
                { label:'return from sales', value:'return from sales' },
                { label:'return from production', value:'return from production' },
                { label:'return from car', value:'return from car' },
            ],
            defaultValue: "return from sales",
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
            name: "create.date",
            label: "Creation Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "create.user",
            label: "Created By User",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "verified.status",
            label: "Verified Status",
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
            label: "Verified By User",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "is_useful",
            label: "Usable",
            type: "switch",
            defaultValue: true,
            required: false,
        },
        {
            name: "is_repack",
            label: "Repackaging",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "is_verified_by_receiver_delivery_unit_user",
            label: "Verified by Delivery Unit",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "poultry_cutting_production_series.product_owner",
            label: "Production Series Owner",
            type: "string-input",
            defaultValue: "",
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
            label: "Production Series Created By",
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
            label: "Production Series Started By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.finished.date",
            label: "Production Series Finished Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.finished.user",
            label: "Production Series Finished By",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "poultry_cutting_production_series.status",
            label: "Production Series Status",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
    ];
}

export const updateDialogDocs: DeepPartial<PoultryCuttingReturn> = {
    id: "456",
    product: {
        product: 0,
        product_owner: 0,
    },
    product_information: {
        weight: 0,
        number: 0,
    },
    return_type: "return from production",
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
    is_useful: true,
    is_repack: false,
    is_verified_by_receiver_delivery_unit_user: false,
    receiver_delivery_unit: "",
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
        options: [], // Populate dynamically from API
        placeholder: "Search Product",
        defaultValue: "",
    },
    {
        name: "product__product_owner",
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
        name: "return_type",
        label: "Return Type",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "return from production",
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
        name: "create__date",
        label: "Creation Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "verified__status",
        label: "Verified Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "is_useful",
        label: "Usable",
        type: "boolean",
        defaultValue: true,
    },
    {
        name: "is_repack",
        label: "Repackaging",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "is_verified_by_receiver_delivery_unit_user",
        label: "Verified by Delivery Unit",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "poultry_cutting_production_series__status",
        label: "Production Series Status",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
];
