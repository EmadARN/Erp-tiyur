import { useState, useEffect } from "react";
import { useGetWarehousesQuery } from "../api/wareHouseApi";
import type {
  Warehouse,
  FiltersRecord,
  WarehouseResponse,
} from "../model/warehouseTypes";
import { tableHead } from "../model/inventoryIndex";

// Helper function to get a value by a nested path.
function getValueByPath(obj: Warehouse, path: string): unknown {
  if (!obj || !path) return "";

  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export const useWarehouseData = () => {
  const [paramsfilterData, setParamsFilterData] = useState<Record<string, any>>(
    {}
  );
  const [filterData, setFilterData] = useState<FiltersRecord>({});
  const { data: warehouses, isLoading } = useGetWarehousesQuery(
    paramsfilterData,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [displayData, setDisplayData] = useState<WarehouseResponse | null>(null);

  useEffect(() => {
    if (warehouses) {
      setDisplayData(warehouses);
    }
  }, [warehouses]);

  const handleFilterOnChange = () => {
    const processFilterData = (dataObj: FiltersRecord): Record<string, any> => {
      return Object.values(dataObj).reduce<Record<string, any>>((acc, data) => {
        if (data.type === "range-box" || data.type === "range") {
          acc[`${data.name}__gte`] = data.value[0];
          acc[`${data.name}__lte`] = data.value[1];
        }
        else if (data.type === "switch" || data.type === "boolean") {
          acc[data.name] = data.value;
        }
        else if (data.type === "multi-select") {
          acc[`${data.name}__in`] = data.value;
        }
        else if (data.type === "autocomplete") {
          acc[`${data.name}__icontains`] = data.value;
        }
        else if (data.type === "select-box") {
          acc[`${data.name}__exact`] = data.value;
        }

        return acc;
      }, {});
    };

    const result = processFilterData(filterData);
    console.log('filter data : ', result);
    setParamsFilterData(result);
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "" && warehouses) {
      setDisplayData(warehouses);
      return;
    }

    const lowerSearch = searchTerm.toString().toLowerCase();

    if (warehouses) {
      const result = warehouses.data.filter((row) =>
        tableHead.some(({ row_id }) => {
          const value = getValueByPath(row, row_id);
          return String(value ?? "")
            .toLowerCase()
            .includes(lowerSearch);
        })
      );
      setDisplayData({ data: result });
    }
  };

  return {
    warehouses: displayData,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  };
};