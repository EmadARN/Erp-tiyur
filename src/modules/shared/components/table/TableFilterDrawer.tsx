import React from "react";
import { Button } from "../ui/Button";
import { Drawer } from "../ui/Drawer";
import { DynamicFilters } from "./DataTableFilters";
import type { TableFilter } from "../../types";
import { type FiltersRecord } from "@/modules/buys/model/buysTypes";
import type { OptionType } from "../../types/common";

type TableFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  tableFilters: TableFilter[];
  filterData: FiltersRecord;
  setFilterData: (data: FiltersRecord) => void;
  onApply?: () => void;
};

type FilterItem = {
  label: string;
  type:
    | "range"
    | "autocomplete"
    | "select-box"
    | "switch"
    | "multi-select"
    | "range-box";
  name: string;
  options?: OptionType[];
  placeholder?: string;
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
};

export const TableFilterDrawer: React.FC<TableFilterDrawerProps> = ({
  open,
  onClose,
  tableFilters,
  filterData,
  setFilterData,
  onApply,
}) => {
  return (
    <div className="relative ml-auto">
      <Drawer open={open} onClose={onClose} width={360}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>

          <div className="space-y-4 mb-6">
            <DynamicFilters
              filtersConfig={tableFilters.map((f) => ({
                label: f.label,
                name: f.name,
                type: f.type as FilterItem["type"], // assertion
                options: f.options,
                placeholder: f.placeholder,
                defaultValue: f.defaultValue,
                min: f.min,
                max: f.max,
                step: f.step,
              }))}
              data={filterData}
              setData={(updater) =>
                setFilterData(
                  typeof updater === "function" ? updater(filterData) : updater
                )
              }
            />
          </div>

          <Button
            size="sm"
            className="w-full bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800"
            onClick={onApply}
          >
            Apply Filters
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
