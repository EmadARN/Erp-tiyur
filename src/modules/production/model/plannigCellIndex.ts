import type { ConfigItem, TableColumn, TableFilter } from "@/modules/shared/types";
import type { PlanningCell, KernelData } from "./planningCellType";

// A utility type to make all properties of an object optional.
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const tableHead: TableColumn[] = [
    { columnName: "id", row_id: "id", type: "string" },
    { columnName: "Priority", row_id: "priority", type: "number" },
    { columnName: "import Type", row_id: "import_type", type: "string" },
    { columnName: "import ID", row_id: "import_id", type: "string" },
];

export function getCreateDialogConfigs(): ConfigItem[] {
    return [
        {
            name: "priority",
            label: "Priority",
            type: "int-input",
            defaultValue: 1,
            required: true,
        },
        {
            name: "import_type",
            label: "import Type",
            type: "select-box",
            options: [

                {label:'production external import', value:'production external import'},
                {label:'production warehouse import', value:'production warehouse import'},
                {label:'poultry cutting production productionUnit import', value:'poultry cutting production productionUnit import'},
                {label:'poultry cutting production warehouse import', value:'poultry cutting production warehouse import'},

            ],
            defaultValue: 'poultry cutting production warehouse import',
            required: true,
        },
        {
            name: "import_id",
            label: "import ID",
            type: "string-input",
            defaultValue: "1",
            required: true,
        },
    ];
}

export function getUpdateDialogConfigs(): ConfigItem[] {
    return [
        {
            name: "priority",
            label: "Priority",
            type: "int-input",
            defaultValue: 1,
            required: true,
        },
        {
            name: "import_type",
            label: "import Type",
            type: "select-box",
            options: [

                {label:'production external import', value:'production external import'},
                {label:'production warehouse import', value:'production warehouse import'},
                {label:'poultry cutting production productionUnit import', value:'poultry cutting production productionUnit import'},
                {label:'poultry cutting production warehouse import', value:'poultry cutting production warehouse import'},

            ],
            defaultValue: 'poultry cutting production warehouse import',
            required: true,
        },
        {
            name: "import_id",
            label: "import ID",
            type: "string-input",
            defaultValue: "1",
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
        label: "Priority",
        type: "range",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: [0, 50],
    },
    {
        name: "import_type",
        label: "Input Type",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Input Type",
        defaultValue: "",
    },
    {
        name: "import_id",
        label: "Input ID",
        type: "autocomplete",
        options: [], // Populate dynamically from API
        placeholder: "Search Input ID",
        defaultValue: "",
    },
];
