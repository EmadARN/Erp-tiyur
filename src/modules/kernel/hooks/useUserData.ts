import { useState, useEffect } from "react";
import { useGetusersQuery } from "../api/userApi.ts";
import type {
  user,
  FiltersRecord,
  usersResponse,
} from "../model/user.ts";
import { tableHead } from "../model/userIndex.ts";

function getValueByPath(obj: user, path: string): unknown {
  if (!obj || !path) return "";
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export const useuserData = () => {
  const [paramsFilterData, setParamsFilterData] = useState<Record<string, any>>(
    {}
  );
  const [filterData, setFilterData] = useState<FiltersRecord>({});
  const { data: users, isLoading } = useGetusersQuery(paramsFilterData, {
    refetchOnMountOrArgChange: true,
  });
  const [displayData, setDisplayData] = useState<usersResponse | null>(null);

  useEffect(() => {
    if (users) {
      setDisplayData(users);
    }
  }, [users]);

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
    if (searchTerm === "" && users) {
      setDisplayData(users);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();
    if (users) {
      const result = users.filter((row) =>
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
    users: displayData,
    isLoading,
    filterData,
    setFilterData,
    handleFilterOnChange,
    handleSearch,
  };
};
