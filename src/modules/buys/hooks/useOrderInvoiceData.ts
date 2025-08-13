import { useState, useEffect } from "react";
import { useGetOrderInvoicesQuery } from "../api/orderInvoiceApi";
import type { OrderInvoice, FiltersRecord, OrderInvoicesResponse } from "../model/orderInvoice";
import { tableHead } from "../model/orderInvoiceIndex.ts";

function getValueByPath(obj: OrderInvoice, path: string): unknown {
    if (!obj || !path) return "";
    return path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object" && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

export const useOrderInvoiceData = () => {
    const [paramsFilterData, setParamsFilterData] = useState<Record<string, any>>({});
    const [filterData, setFilterData] = useState<FiltersRecord>({});
    const { data: invoices, isLoading } = useGetOrderInvoicesQuery(paramsFilterData, {
        refetchOnMountOrArgChange: true,
    });
    const [displayData, setDisplayData] = useState<OrderInvoicesResponse | null>(null);

    useEffect(() => {
        if (invoices) {
            setDisplayData(invoices);
        }
    }, [invoices]);

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
        if (searchTerm === "" && invoices) {
            setDisplayData(invoices);
            return;
        }
        const lowerSearch = searchTerm.toLowerCase();
        if (invoices) {
            const result = invoices.data.filter((row) =>
                tableHead.some(({ row_id }) => {
                    const value = getValueByPath(row, row_id);
                    return String(value ?? "").toLowerCase().includes(lowerSearch);
                })
            );
            setDisplayData({ data: result });
        }
    };

    return {
        invoices: displayData,
        isLoading,
        filterData,
        setFilterData,
        handleFilterOnChange,
        handleSearch,
    };
};
