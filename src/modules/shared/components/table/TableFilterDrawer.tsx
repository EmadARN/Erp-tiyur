import React from "react";
import { Button } from "../ui/Button";
import { Drawer } from "../ui/Drawer";
import { FiFilter } from "react-icons/fi";
import { DynamicFilters } from "./DataTableFilters";
import type { TableFilter } from "../../types";

type TableFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  tableFilters: TableFilter[];
  filterData: any;
  setFilterData: (data: any) => void;
  onApply?: () => void;
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
      <Button variant="outline" size="sm" onClick={onClose}>
        <FiFilter />
      </Button>
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
              filtersConfig={tableFilters}
              data={filterData}
              setData={setFilterData}
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
