import { useState, useEffect } from "react";
import { useGetLoadedProductItemsQuery } from "../api/loadedProductItemsApi";
import type { LoadedProductItem, FiltersRecord, LoadedProductItemsResponse } from "../model/loadedProductItemsTypes";
import { tableHead } from "../model/loadedProductItemsIndex";

function getValueByPath(obj: LoadedProductItem, path: string): unknown {
  if (!obj || !path) return "";
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export const useLoadedProductItemsData = () => {
  const [paramsFilterData, setParamsFilterData] = useState<Record<string, any>>({});
  const [filterData, setFilterData] = useState<FiltersRecord>({});
  const { data: items, isLoading } = useGetLoadedProductItemsQuery(paramsFilterData, {
    refetchOnMountOrArgChange: true,
  });
  const [displayData, setDisplayData] = useState<LoadedProductItemsResponse | null>(null);

  useEffect(() => {
    if (items) {
      setDisplayData(items);
    }
  }, [items]);

  const handleFilterOnChange = () => {
    const processFilterData = (dataObj: FiltersRecord): Record<string, any> => {
      return Object.values(dataObj).reduce<Record<string, any>>((acc, data) => {
        if (data.type === "range" || data.type === "range-box") {
          acc[`${data.name}__gte`] = data.value[0];
          acc[`${data.name}__lte`] = data.value[1];
        } else if (data.type === "switch") {
          acc[data.name] = data.value;
        } else if (data.type === "multi-select") {
          acc[`${data.name}__in`] = data.value;
        } else if (data.type === "autocomplete") {
          acc[`${data.name}__icontains`] = data.value;
        } else if (data.type === "select-box") {
          acc[`${data.name}__exact`] = data.value;
        }
        return acc;
      }, {});
    };
    setParamsFilterData(processFilterData(filterData));
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm && items) {
      setDisplayData(items);
      return;
    }
    const lower = searchTerm.toLowerCase();
    if (items) {
      const result = items.data.filter((row) =>
        tableHead.some(({ row_id }) => String(getValueByPath(row, row_id) ?? "").toLowerCase().includes(lower))
      );
      setDisplayData({ data: result });
    }
  };

  return {
    loadedProductItems: displayData,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  };
};
