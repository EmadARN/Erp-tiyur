import { useState, useEffect } from "react";
import { useGetOrdersQuery } from "../api/orderApi";
import type {
    Order,
    FiltersRecord,
    OrdersResponse,
} from "../model/orderType.ts";
import { tableHead } from "../model/orderIndex.ts";

// Helper function to get a value by a nested path.
function getValueByPath(obj: Order, path: string): unknown {
    if (!obj || !path) return "";

    return path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object" && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

export const useOrderData = () => {
    const [paramsFilterData, setParamsFilterData] = useState<Record<string, any>>({});
    const [filterData, setFilterData] = useState<FiltersRecord>({});
    const { data: orders, isLoading } = useGetOrdersQuery(
        paramsFilterData,
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const [displayData, setDisplayData] = useState<OrdersResponse | null>(null);

    useEffect(() => {
        if (orders) {
            setDisplayData(orders);
        }
    }, [orders]);

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
        if (searchTerm === "" && orders) {
            setDisplayData(orders);
            return;
        }

        const lowerSearch = searchTerm.toString().toLowerCase();

        if (orders) {
            const result = orders.data.filter((row) =>
                tableHead.some(({ row_id }) => {
                    const value = getValueByPath(row, row_id);
                    return String(value ?? "").toLowerCase().includes(lowerSearch);
                })
            );
            setDisplayData({ data: result });
        }
    };

    return {
        orders: displayData,
        isLoading,
        filterData,
        setFilterData,
        handleFilterOnChange,
        handleSearch,
    };
};