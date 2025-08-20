import { useState, useEffect } from "react";
import { useGetcitysQuery } from "../api/cityApi.ts";
import type {
  city,
  FiltersRecord,
  citysResponse,
} from "../model/city.ts";
import { tableHead } from "../model/CityIndex.ts";

function getValueByPath(obj: city, path: string): unknown {
  if (!obj || !path) return "";
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export const usecityData = () => {
  const [paramsFilterData, setParamsFilterData] = useState<Record<string, any>>(
    {}
  );
  const [filterData, setFilterData] = useState<FiltersRecord>({});
  const { data: citys, isLoading } = useGetcitysQuery(paramsFilterData, {
    refetchOnMountOrArgChange: true,
  });
  const [displayData, setDisplayData] = useState<citysResponse | null>(null);

  useEffect(() => {
    if (citys) {
      setDisplayData(citys);
    }
  }, [citys]);

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
    if (searchTerm === "" && citys) {
      setDisplayData(citys);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    if (citys) {
      const result = citys.filter((row) =>
        tableHead.some(({ row_id }) => {
          const value = getValueByPath(row, row_id);
          return String(value ?? "")
            .toLowerCase()
            .includes(lowerSearch);
        })
      );

      setDisplayData(result);
    }
  };

  return {
    citys: displayData,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  };
};
