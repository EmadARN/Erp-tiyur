import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { ProductionSeries, KernelData } from "./productionSeriesType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Product Owner", row_id: "product_owner.contact.name", type: "number" },
    { columnName: "Status", row_id: "status", type: "string" },
    { columnName: "Creation Date", row_id: "create.date", type: "string" },
    { columnName: "Created By", row_id: "create.user", type: "string" },
    { columnName: "Start Date", row_id: "start.date", type: "string" },
    { columnName: "Started By", row_id: "start.user", type: "string" },
    { columnName: "Finish Date", row_id: "finish.date", type: "string" },
    { columnName: "Finished By", row_id: "finish.user", type: "string" },
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
            label: "Creation Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "create.user",
            label: "Created By",
            type: "string-input",
            defaultValue: "",
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
            defaultValue: "",
            required: false,
        },
        {
            name: "finish.date",
            label: "Finish Date",
            type: "string-input",
            defaultValue: "2025-08-14 10:26",
            required: false,
        },
        {
            name: "finish.user",
            label: "Finished By",
            type: "string-input",
            defaultValue: "",
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
            defaultValue: "pending",
            required: true,
        },
    ];
}

export const updateDialogDocs: DeepPartial<ProductionSeries> = {
    id: "221",
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
        name: "status",
        label: "Status",
        type: "select-box",
        options: [], // Populate dynamically from API
        defaultValue: "pending",
    },
    {
        name: "create__date",
        label: "Creation Date",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Creation Date",
        defaultValue: "",
    },
    {
        name: "start__date",
        label: "Start Date",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Start Date",
        defaultValue: "",
    },
    {
        name: "finish__date",
        label: "Finish Date",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Finish Date",
        defaultValue: "",
    },
];
