import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { Order, KernelData } from "./orderType.ts";

// A utility type to make all properties of an object, including nested ones, optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Customer", row_id: "customer", type: "string" },
    { columnName: "Car", row_id: "car.car.car_number", type: "string" },
    { columnName: "Driver", row_id: "car.driver.contact.name", type: "string" },
    { columnName: "Attachment Status", row_id: "attachment_status.status", type: "boolean" },
    { columnName: "Cancelled", row_id: "cancelled.status", type: "boolean" },
    { columnName: "Verified", row_id: "verified.status", type: "boolean" },
];

export function getCreateDialogConfigs({
                                       }: KernelData): ConfigItem[] {
    return [
        {
            name: "customer",
            label: "Customer",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
    ];
}

export function getUpdateDialogConfigs({
                                           customers,
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
            name: "customer",
            label: "Customer",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "car.car",
            label: "Car",
            type: "select-box",
            options: cars,
            defaultValue: cars?.[0]?.value,
            required: true,
        },
        {
            name: "car.driver",
            label: "Driver",
            type: "select-box",
            options: drivers,
            defaultValue: drivers?.[0]?.value,
            required: true,
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
        {
            name: "attachment_status.status",
            label: "Attachment Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "attachment_status.user_date.date",
            label: "Attachment Status Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "attachment_status.user_date.user",
            label: "Attachment Status User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "cancelled.status",
            label: "Cancelled Status",
            type: "switch",
            defaultValue: false,
            required: false,
        },
        {
            name: "cancelled.user_date.date",
            label: "Cancelled Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "cancelled.user_date.user",
            label: "Cancelled User",
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
            label: "Verified Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "verified.user_date.user",
            label: "Verified User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
    ];
}

export const updateDialogDocs: DeepPartial<Order> = {
    "id": "182",
    "customer": "string",
    "create": {
        "date": "2025-08-13 18:53",
        "user": "string"
    },
    "car": {
        "driver": "",
        "car": ""
    },
    "attachment_status": {
        "status": false,
        "user_date": {
            "date": "2025-08-13 18:53",
            "user": "string"
        }
    },
    "cancelled": {
        "status": false,
        "user_date": {
            "date": "2025-08-13 18:53",
            "user": "string"
        }
    },
    "verified": {
        "status": false,
        "user_date": {
            "date": "2025-08-13 18:53",
            "user": "string"
        }
    }
}

export const tableFilter: TableFilter[] = [
    {
        name: "customer",
        label: "Customer",
        type: "autocomplete",
        options: [],
        placeholder: "Search customer",
        defaultValue: "",
    },
    {
        name: "car__car",
        label: "Car",
        type: "autocomplete",
        options: [],
        placeholder: "Search car",
        defaultValue: "",
    },
    {
        name: "car__driver",
        label: "Driver",
        type: "autocomplete",
        options: [],
        placeholder: "Search driver",
        defaultValue: "",
    },
    {
        name: "attachment_status__status",
        label: "Attachment Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "cancelled__status",
        label: "Cancelled Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "verified__status",
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