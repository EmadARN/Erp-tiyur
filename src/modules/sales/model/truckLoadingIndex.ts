import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { TruckLoading, KernelData } from "./truckLoadingType.ts";

// A utility type to make all properties of an object, including nested ones, optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Car", row_id: "car.car.car_number", type: "string" },
    { columnName: "Driver", row_id: "car.driver.contact.name", type: "string" },
    { columnName: "Level", row_id: "level", type: "string" },
    { columnName: "Buyer", row_id: "buyer", type: "string" },
    { columnName: "First Weight", row_id: "first_weight.weight", type: "number" },
    { columnName: "Last Weight", row_id: "last_weight.weight", type: "number" },
];

export function getCreateDialogConfigs({
                                           cars,
                                           drivers,
                                       }: KernelData): ConfigItem[] {
    return [
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
    ];
}

export function getUpdateDialogConfigs({
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
            name: "level",
            label: "Level",
            type: "select-box",
            options: [
                { label: "entrance", value: "entrance" },
                { label: "loading", value: "loading" },
                { label: "exit", value: "exit" },
            ],
            defaultValue: "entrance",
            required: true,
        },
        {
            name: "buyer",
            label: "Buyer",
            type: "string-input",
            defaultValue: "",
            required: true,
        },
        {
            name: "first_weight.weight",
            label: "First Weight",
            type: "int-input",
            defaultValue: 0,
            required: false,
        },
        {
            name: "first_weight.date.date",
            label: "First Weight Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "first_weight.date.user",
            label: "First Weight User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "last_weight.weight",
            label: "Last Weight",
            type: "int-input",
            defaultValue: 0,
            required: false,
        },
        {
            name: "last_weight.date.date",
            label: "Last Weight Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "last_weight.date.user",
            label: "Last Weight User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "create_at.date",
            label: "Create Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "create_at.user",
            label: "Create User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "entrance_date.date",
            label: "Entrance Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "entrance_date.user",
            label: "Entrance User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "exit_date.date",
            label: "Exit Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "exit_date.user",
            label: "Exit User",
            type: "string-input",
            defaultValue: "",
            required: false,
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
            defaultValue: "",
            required: false,
        },
        {
            name: "is_cancelled.user_date.user",
            label: "Cancelled User",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
    ];
}

export const updateDialogDocs: DeepPartial<TruckLoading> = {
    "id": "197",
    "car": {
        "driver": "",
        "car": ""
    },
    "create_at": {
        "date": "2025-08-13 18:53",
        "user": "string"
    },
    "level": "entrance",
    "first_weight": {
        "weight": 0,
        "date": {
            "date": "2025-08-13 18:53",
            "user": "string"
        }
    },
    "last_weight": {
        "weight": 0,
        "date": {
            "date": "2025-08-13 18:53",
            "user": "string"
        }
    },
    "buyer": "string",
    "entrance_date": {
        "date": "2025-08-13 18:53",
        "user": "string"
    },
    "exit_date": {
        "date": "2025-08-13 18:53",
        "user": "string"
    },
    "is_cancelled": {
        "status": false,
        "user_date": {
            "date": "2025-08-13 18:53",
            "user": "string"
        }
    }
}
export const tableFilter: TableFilter[] = [
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
        name: "level",
        label: "Level",
        type: "select-box",
        options: [
            { label: "entrance", value: "entrance" },
            { label: "loading", value: "loading" },
            { label: "exit", value: "exit" },
        ],
        defaultValue: "entrance",
    },
    {
        name: "buyer",
        label: "Buyer",
        type: "autocomplete",
        options: [],
        placeholder: "Search buyer",
        defaultValue: "",
    },
    {
        name: "first_weight__weight",
        label: "First Weight",
        type: "range",
        min: 0,
        max: 10000,
        step: 10,
        defaultValue: [0, 5000],
    },
    {
        name: "last_weight__weight",
        label: "Last Weight",
        type: "range",
        min: 0,
        max: 10000,
        step: 10,
        defaultValue: [0, 5000],
    },
    {
        name: "create_at__date",
        label: "Create Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "entrance_date__date",
        label: "Entrance Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "exit_date__date",
        label: "Exit Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "is_cancelled__status",
        label: "Cancelled Status",
        type: "boolean",
        defaultValue: false,
    },
];