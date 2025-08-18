import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { PoultryCuttingSeries, KernelData } from "./poultryCuttingSeriesType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Product Owner", row_id: "product_owner.contact.name", type: "string" },
    { columnName: "Created Date", row_id: "create.date", type: "string" },
    { columnName: "Created By", row_id: "create.user", type: "string" },
    { columnName: "Start Date", row_id: "start.date", type: "string" },
    { columnName: "Started By", row_id: "start.user", type: "string" },
    { columnName: "Finished Date", row_id: "finished.date", type: "string" },
    { columnName: "Finished By", row_id: "finished.user", type: "string" },
    { columnName: "Status", row_id: "status", type: "string" },
];

export function getCreateDialogConfigs({ owners }: KernelData): ConfigItem[] {
    return [
        {
            name: "product_owner",
            label: "Product Owner",
            type: "select-box",
            options: owners,
            defaultValue: owners?.[0]?.value,
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({ owners }: KernelData): ConfigItem[] {
    return [
        {
            name: "product_owner",
            label: "Product Owner",
            type: "select-box",
            options: owners,
            defaultValue: owners?.[0]?.value,
            required: true,
        },
        {
            name: "create.date",
            label: "Created Date",
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
            name: "start.date",
            label: "Start Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "start.user",
            label: "Started By",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "finished.date",
            label: "Finished Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "finished.user",
            label: "Finished By",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "status",
            label: "Status",
            type: "select-box",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Started", value: "started" },
                { label: "Finished", value: "finished" },
            ],
            defaultValue: "return from sales",
            required: true,
        },
    ];
}

export const updateDialogDocs: DeepPartial<PoultryCuttingSeries> = {
    id: "162",
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
};

export const tableFilter: TableFilter[] = [
    {
        name: "product_owner",
        label: "Product Owner",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Product Owner",
        defaultValue: "",
    },
    {
        name: "create__date",
        label: "Created Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "start__date",
        label: "Start Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "finished__date",
        label: "Finished Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "status",
        label: "Status",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
];
