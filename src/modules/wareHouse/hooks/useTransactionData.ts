import { useState, useEffect } from "react";
import { useGetTransactionsQuery } from "../api/transactionApi";
import type {
  Transaction,
  FiltersRecord,
  TransactionResponse,
} from "../model/transactionTypes";
import { tableHead } from "../model/transactionIndex";

// Helper function to get a value by a nested path.
function getValueByPath(obj: Transaction, path: string): unknown {
  if (!obj || !path) return "";

  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export const useTransactionData = () => {
  const [paramsfilterData, setParamsFilterData] = useState<Record<string, any>>(
    {}
  );
  const [filterData, setFilterData] = useState<FiltersRecord>({});
  const { data: transactions, isLoading } = useGetTransactionsQuery(
    paramsfilterData,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [displayData, setDisplayData] = useState<TransactionResponse | null>(null);

  useEffect(() => {
    if (transactions) {
      setDisplayData(transactions);
    }
  }, [transactions]);

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
    if (searchTerm === "" && transactions) {
      setDisplayData(transactions);
      return;
    }

    const lowerSearch = searchTerm.toString().toLowerCase();

    if (transactions) {
      const result = transactions.data.filter((row) =>
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
    transactions: displayData,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  };
};