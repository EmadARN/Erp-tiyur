import { useState, useEffect } from "react";
import { useGetBuyProductQuery } from "../api/buyProductApi";
import type {
  BuyProduct,
  FiltersRecord,
  OrdersResponse,
} from "../model/buysProduct.ts";
import { tableHead } from "../model/buyProductIndex.ts";

// Helper function to get a value by a nested path.
// Using `unknown` is safer than `any` for dynamic lookups.
function getValueByPath(obj: BuyProduct, path: string): unknown {
  if (!obj || !path) return "";

  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export const useBuyProductData = () => {
  const [paramsfilterData, setParamsFilterData] = useState<Record<string, any>>(
    {}
  );
  const [filterData, setFilterData] = useState<FiltersRecord>({});
  const { data: buyProducts, isLoading } = useGetBuyProductQuery(
    paramsfilterData,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [displayData, setDisplayData] = useState<OrdersResponse | null>(null);

  useEffect(() => {
    if (buyProducts) {
      setDisplayData(buyProducts);
    }
  }, [buyProducts]);

  // const handleFilterOnChange = () => {
  //   const processFilterData = (
  //     dataObj: FiltersRecord
  //   ): Record<string, any> => {
  //     return Object.values(dataObj).reduce<Record<string, any>>((acc, data) => {
  //       if (data.type === "range-box" || data.type === "range") {
  //         acc[`${data.name}__gte`] = data.value[0];
  //         acc[`${data.name}__lte`] = data.value[1];
  //       } else if (
  //         ["switch", ].includes(data.type)
  //       ) {
  //         acc[data.name] = data.value;
  //       } else if (data.type === "multi-select") {
  //         acc[`${data.name}__in`] = data.value;
  //       } else if (data.type === "autocomplete" || data.type === "select-box" ) {
  //         acc[`${data.name}__contains`] = data.value;
  //       }
  //
  //       return acc;
  //     }, {});
  //   };
  //
  //   const result = processFilterData(filterData);
  //   console.log('filter data : ', result)
  //   setParamsFilterData(result);
  // };
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
          // برای autocomplete معمولا __icontains مناسب تره
          acc[`${data.name}__icontains`] = data.value;
        } else if (data.type === "select-box") {
          // برای select-box که گزینه ثابت داره، بهتره exact باشه
          acc[`${data.name}__exact`] = data.value;
        }

        return acc;
      }, {});
    };

    const result = processFilterData(filterData);
    console.log("filter data : ", result);
    setParamsFilterData(result);
    // اینجا میفرستی به API
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "" && buyProducts) {
      setDisplayData(buyProducts);
      return;
    }

    const lowerSearch = searchTerm.toString().toLowerCase();

    if (buyProducts) {
      const result = buyProducts.data.filter((row) =>
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
    buyProducts: displayData,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  };
};
