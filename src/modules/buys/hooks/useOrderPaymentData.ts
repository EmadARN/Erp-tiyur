import { useState, useEffect } from "react";
import { useGetOrderPaymentsQuery } from "../api/orderPaymentApi";
import type { OrderPayment, FiltersRecord, OrderPaymentsResponse } from "../model/orderPayment";
import { tableHead } from "../model/index.ts";

function getValueByPath(obj: OrderPayment, path: string): unknown {
    if (!obj || !path) return "";
    return path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object" && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

export const useOrderPaymentData = () => {
    const [paramsFilterData, setParamsFilterData] = useState<Record<string, any>>({});
    const [filterData, setFilterData] = useState<FiltersRecord>({});
    const { data: payments, isLoading } = useGetOrderPaymentsQuery(paramsFilterData, {
        refetchOnMountOrArgChange: true,
    });
    const [displayData, setDisplayData] = useState<OrderPaymentsResponse | null>(null);

    useEffect(() => {
        if (payments) {
            setDisplayData(payments);
        }
    }, [payments]);

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
        if (searchTerm === "" && payments) {
            setDisplayData(payments);
            return;
        }
        const lowerSearch = searchTerm.toLowerCase();
        if (payments) {
            const result = payments.data.filter((row) =>
                tableHead.some(({ row_id }) => {
                    const value = getValueByPath(row, row_id);
                    return String(value ?? "").toLowerCase().includes(lowerSearch);
                })
            );
            setDisplayData({ data: result });
        }
    };

    return {
        payments: displayData,
        isLoading,
        filterData,
        setFilterData,
        handleFilterOnChange,
        handleSearch,
    };
};
