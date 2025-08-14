import { useState, useEffect } from "react";
import { useGetLoadedProductsQuery } from "../api/loadedProductApi";
import type {
  LoadedProduct,
  FiltersRecord,
  LoadedProductsResponse,
} from "../model/loadedProductTypes";
import { tableHead } from "../model/loadedProductIndex.ts";

// Helper function to get a value by a nested path.
function getValueByPath(obj: LoadedProduct, path: string): unknown {
  if (!obj || !path) return "";

  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export const useLoadedProductData = () => {
  const [paramsFilterData, setParamsFilterData] = useState<Record<string, any>>({});
  const [filterData, setFilterData] = useState<FiltersRecord>({});
  const { data: loadedProducts, isLoading } = useGetLoadedProductsQuery(
      paramsFilterData,
      {
        refetchOnMountOrArgChange: true,
      }
  );
  const [displayData, setDisplayData] = useState<LoadedProductsResponse | null>(null);

  useEffect(() => {
    if (loadedProducts) {
      setDisplayData(loadedProducts);
    }
  }, [loadedProducts]);

  const handleFilterOnChange = () => {
    const processFilterData = (dataObj: FiltersRecord): Record<string, any> => {
      return Object.values(dataObj).reduce<Record<string, any>>((acc, data) => {
        if (data.type === "range-box" || data.type === "range") {
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

    const result = processFilterData(filterData);
    console.log("filter data: ", result);
    setParamsFilterData(result);
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "" && loadedProducts) {
      setDisplayData(loadedProducts);
      return;
    }

    const lowerSearch = searchTerm.toString().toLowerCase();

    if (loadedProducts) {
      const result = loadedProducts.data.filter((row) =>
          tableHead.some(({ row_id }) => {
            const value = getValueByPath(row, row_id);
            return String(value ?? "").toLowerCase().includes(lowerSearch);
          })
      );
      setDisplayData({ data: result });
    }
  };

  return {
    loadedProducts: displayData,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  };
};