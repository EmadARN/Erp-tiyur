import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { ProductionReturnProduct, KernelData } from "./productionReturnProductType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Receiver Delivery Unit", row_id: "receiver_delivery_unit", type: "string" },
    { columnName: "Product", row_id: "product.product.name", type: "number" },
    { columnName: "Product Owner", row_id: "product.product_owner.contact.name", type: "number" },
    { columnName: "Weight", row_id: "product_information.weight", type: "number" },
    { columnName: "Quantity", row_id: "product_information.number", type: "number" },
    { columnName: "Return Type", row_id: "return_type", type: "string" },
    { columnName: "Usable", row_id: "is_useful", type: "boolean" },
    { columnName: "Repackaging", row_id: "is_repack", type: "boolean" },
    { columnName: "Verified Status", row_id: "verified.status", type: "boolean" },
    { columnName: "Production Series Status", row_id: "production_series.status", type: "string" },
];

export function getCreateDialogConfigs({ products, owners }: KernelData): ConfigItem[] {
    return [
        {
            name: "receiver_delivery_unit",
            label: "Receiver Delivery Unit",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
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
                {label: 'Return from Sales', value:'return from sales'},
                {label: 'Return from Production', value:'return from production'},
                {label: 'Return from Car', value:'return from car'},
            ],
            defaultValue: 'return from sales',
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({ products, owners }: KernelData): ConfigItem[] {
    return [
        {
            name: "receiver_delivery_unit",
            label: "Receiver Delivery Unit",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
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
                {label: 'Return from Sales', value:'return from sales'},
                {label: 'Return from Production', value:'return from production'},
                {label: 'Return from Car', value:'return from car'},
            ],
            defaultValue: 'return from sales',
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
            label: "Creator",
            type: "string-input",
            defaultValue: "",
            required: false,
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
            label: "Verifier",
            type: "string-input",
            defaultValue: "",
            required: false,
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
            name: "production_series.product_owner",
            label: "Production Series Product Owner",
            type: "string-input",
            defaultValue: "",
            required: false,
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
            required: false,
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
            required: false,
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
            required: false,
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

export const updateDialogDocs: DeepPartial<ProductionReturnProduct> = {
    id: "468",
    receiver_delivery_unit: "",
    product: {
        product: 0,
        product_owner: 0,
    },
    product_information: {
        weight: 0,
        number: 0,
    },
    return_type: "Return from Production",
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
        name: "receiver_delivery_unit",
        label: "Receiver Delivery Unit",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Receiver Delivery Unit",
        defaultValue: "",
    },
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
        defaultValue: "Return from Production",
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
        name: "verified__status",
        label: "Verified Status",
        type: "boolean",
    }
]