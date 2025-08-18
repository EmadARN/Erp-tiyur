import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { PlanningSeries, KernelData } from "./planningSeriesType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "ID", row_id: "id", type: "string" },
    { columnName: "Created Date", row_id: "create.date", type: "string" },
    { columnName: "Created By", row_id: "create.user", type: "string" },
    { columnName: "Completion Status", row_id: "is_finished", type: "boolean" },
];

export function getCreateDialogConfigs(): ConfigItem[] {
    return [
        {
            name: "is_finished",
            label: "Completion Status",
            type: "switch",
            defaultValue: false,
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs(): ConfigItem[] {
    return [
        {
            name: "is_finished",
            label: "Completion Status",
            type: "switch",
            defaultValue: false,
            required: true,
        },
        {
            name: "create.date",
            label: "Created Date",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
        {
            name: "create.user",
            label: "Created By",
            type: "string-input",
            defaultValue: "",
            required: false,
        },
    ];
}

export const updateDialogDocs: DeepPartial<PlanningSeries> = {
    id: "185",
    create: {
        date: "2025-08-14 10:26",
        user: "",
    },
    is_finished: false,
};

export const tableFilter: TableFilter[] = [
    {
        name: "is_finished",
        label: "Completion Status",
        type: "boolean",
        defaultValue: false,
    },
    {
        name: "create__date",
        label: "Created Date",
        type: "range-date",
        defaultValue: ["2025-01-01", "2025-12-31"],
    },
    {
        name: "create__user",
        label: "Created By",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Created By",
        defaultValue: "",
    },
];
