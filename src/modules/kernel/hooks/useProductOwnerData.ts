import { useState, useEffect } from "react";
import { useGetproductOwnersQuery } from "../api/productOwnerApi.ts";
import type {
  productOwner,
  FiltersRecord,
  productOwnersResponse,
} from "../model/productOwner.ts";
import { tableHead } from "../model/productOwnerIndex.ts";

function getValueByPath(obj: productOwner, path: string): unknown {
  if (!obj || !path) return "";
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export const useproductOwnerData = () => {
  const [paramsFilterData, setParamsFilterData] = useState<Record<string, any>>(
    {}
  );
  const [filterData, setFilterData] = useState<FiltersRecord>({});
  const { data: productOwners, isLoading } = useGetproductOwnersQuery(paramsFilterData, {
    refetchOnMountOrArgChange: true,
  });
  const [displayData, setDisplayData] = useState<productOwnersResponse | null>(null);

  useEffect(() => {
    if (productOwners) {
      setDisplayData(productOwners);
    }
  }, [productOwners]);

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
    if (searchTerm === "" && productOwners) {
      setDisplayData(productOwners);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    if (productOwners) {
      const result = productOwners.filter((row) =>
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
    productOwners: displayData,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  };
};
