import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { OrderItem, KernelData } from "./orderItemsType.ts";

// A utility type to make all properties of an object, including nested ones, optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Product", row_id: "product.name", type: "string" },
    { columnName: "Weight", row_id: "weight", type: "number" },
    { columnName: "Number", row_id: "number", type: "number" },
    { columnName: "Customer", row_id: "order.customer.name", type: "string" },
    { columnName: "Car", row_id: "order.car.car.car_number", type: "string" },
    { columnName: "Driver", row_id: "order.car.driver.contact.name", type: "string" },
];

export function getCreateDialogConfigs({
                                           products,
                                           customers,
                                           cars,
                                           drivers,
                                       }: KernelData): ConfigItem[] {
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
            name: "weight",
            label: "Weight",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "number",
            label: "Number",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "order.customer",
            label: "Customer",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "order.car.car",
            label: "Car",
            type: "select-box",
            options: cars,
            defaultValue: cars?.[0]?.value,
            required: true,
        },
        {
            name: "order.car.driver",
            label: "Driver",
            type: "select-box",
            options: drivers,
            defaultValue: drivers?.[0]?.value,
            required: true,
        },
        {
            name: "order.create.date",
            label: "Order Create Date",
            type: "string-input",
            defaultValue: "2025-08-13 18:53",
            required: true,
        },
        {
            name: "order.create.user",
            label: "Order Create User",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "order.attachment_status.status",
            label: "Attachment Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "order.attachment_status.user_date.date",
            label: "Attachment Status Date",
            type: "string-input",
            defaultValue: "2025-08-13 18:53",
            required: false,
        },
        {
            name: "order.attachment_status.user_date.user",
            label: "Attachment Status User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.cancelled.status",
            label: "Cancelled Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "order.cancelled.user_date.date",
            label: "Cancelled Date",
            type: "string-input",
            defaultValue: "2025-08-13 18:53",
            required: false,
        },
        {
            name: "order.cancelled.user_date.user",
            label: "Cancelled User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.verified.status",
            label: "Verified Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "order.verified.user_date.date",
            label: "Verified Date",
            type: "string-input",
            defaultValue: "2025-08-13 18:53",
            required: false,
        },
        {
            name: "order.verified.user_date.user",
            label: "Verified User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
    ];
}

export function getUpdateDialogConfigs({
                                           products,
                                           cars,
                                           drivers,
                                       }: KernelData): ConfigItem[] {
    return [
        {
            name: "id",
            label: "ID",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "product",
            label: "Product",
            type: "select-box",
            options: products,
            defaultValue: products?.[0]?.value,
            required: true,
        },
        {
            name: "weight",
            label: "Weight",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "number",
            label: "Number",
            type: "int-input",
            defaultValue: 0,
            required: true,
        },
        {
            name: "order.customer",
            label: "Customer",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.car.car",
            label: "Car",
            type: "select-box",
            options: cars,
            defaultValue: cars?.[0]?.value

            ,
            required: true,
        },
        {
            name: "order.car.driver",
            label: "Driver",
            type: "select-box",
            options: drivers,
            defaultValue: drivers?.[0]?.value,
            required: true,
        },
        {
            name: "order.create.date",
            label: "Order Create Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.create.user",
            label: "Order Create User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.attachment_status.status",
            label: "Attachment Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "order.attachment_status.user_date.date",
            label: "Attachment Status Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.attachment_status.user_date.user",
            label: "Attachment Status User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.cancelled.status",
            label: "Cancelled Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "order.cancelled.user_date.date",
            label: "Cancelled Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.cancelled.user_date.user",
            label: "Cancelled User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.verified.status",
            label: "Verified Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "order.verified.user_date.date",
            label: "Verified Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "order.verified.user_date.user",
            label: "Verified User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "create.date",
            label: "Create Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "create.user",
            label: "Create User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
    ];
}

export const updateDialogDocs: DeepPartial<OrderItem> = {
    id: "178",
    product: "string",
    weight: 0,
    number: 0,
    order: {
        customer: "string",
        create: {
            date: "2025-08-13 18:53",
            user: "string",
        },
        car: {
            driver: "",
            car: "",
        },
        attachment_status: {
            status: false,
            user_date: {
                date: "2025-08-13 18:53",
                user: "string",
            },
        },
        cancelled: {
            status: false,
            user_date: {
                date: "2025-08-13 18:53",
                user: "string",
            },
        },
        verified: {
            status: false,
            user_date: {
                date: "2025-08-13 18:53",
                user: "string",
            },
        },
    },
    create: {
        date: "2025-08-13 18:53",
        user: "string",
    },
};

export const tableFilter: TableFilter[] = [
    {
        name: "product",
        label: "Product",
        type: "autocomplete",
        options: [],
        placeholder: "Search product",
        defaultValue: "",
    },
    {
        name: "weight",
        label: "Weight",
        type: "range",
        min: 0,
        max: 10000,
        step: 10,
        defaultValue: [0, 5000],
    },
    {
        name: "number",
        label: "Number",
        type: "range",
        min: 0,
        max: 1000,
        step: 1,
        defaultValue: [0, 500],
    },
    {
        name: "order__customer",
        label: "Customer",
        type: "autocomplete",
        options: [],
        placeholder: "Search customer",
        defaultValue: "",
    },
    {
        name: "order__car__car",
        label: "Car",
        type: "autocomplete",
        options: [],
        placeholder: "Search car",
        defaultValue: "",
    },
    {
        name: "order__car__driver",
        label: "Driver",
        type: "autocomplete",
        options: [],
        placeholder: "Search driver",
        defaultValue: "",
    },
    {
        name: "order__attachment_status__status",
        label: "Attachment Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "order__cancelled__status",
        label: "Cancelled Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "order__verified__status",
        label: "Verified Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "create__date",
        label: "Create Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
];