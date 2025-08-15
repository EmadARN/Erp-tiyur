import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { PlanningCell, KernelData } from "./planningCellType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "شناسه", row_id: "id", type: "string" },
    { columnName: "اولویت", row_id: "priority", type: "number" },
    { columnName: "نوع ورودی", row_id: "import_type", type: "string" },
    { columnName: "شناسه ورودی", row_id: "import_id", type: "string" },
];

export function getCreateDialogConfigs({ import_types, import_ids }: KernelData): ConfigItem[] {
    return [
        {
            name: "priority",
            label: "اولویت",
            type: "int-input",
            defaultValue: 1,
            required: true,
        },
        {
            name: "import_type",
            label: "نوع ورودی",
            type: "select-box",
            options: import_types,
            defaultValue: import_types?.[0]?.value,
            required: true,
        },
        {
            name: "import_id",
            label: "شناسه ورودی",
            type: "select-box",
            options: import_ids,
            defaultValue: import_ids?.[0]?.value,
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs({ import_types, import_ids }: KernelData): ConfigItem[] {
    return [
        {
            name: "priority",
            label: "اولویت",
            type: "int-input",
            defaultValue: 1,
            required: true,
        },
        {
            name: "import_type",
            label: "نوع ورودی",
            type: "select-box",
            options: import_types,
            defaultValue: import_types?.[0]?.value,
            required: true,
        },
        {
            name: "import_id",
            label: "شناسه ورودی",
            type: "select-box",
            options: import_ids,
            defaultValue: import_ids?.[0]?.value,
            required: true,
        },
    ];
}

export const updateDialogDocs: DeepPartial<PlanningCell> = {
    id: "164",
    priority: 1,
    import_type: "",
    import_id: "",
};

export const tableFilter: TableFilter[] = [
    {
        name: "priority",
        label: "اولویت",
        type: "range",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: [0, 50],
    },
    {
        name: "import_type",
        label: "نوع ورودی",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی نوع ورودی",
        defaultValue: "",
    },
    {
        name: "import_id",
        label: "شناسه ورودی",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "جستجوی شناسه ورودی",
        defaultValue: "",
    },
];