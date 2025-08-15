import { useState, useEffect } from "react";
import { useGetProductionExportsQuery } from "../api/productionExportApi";
import type {
    ProductionExport,
    FiltersRecord,
    ProductionExportsResponse,
} from "../model/productionExportType";
import { tableHead } from "../model/productionExportIndex";

function getValueByPath(obj: ProductionExport, path: string): unknown {
    if (!obj || !path) return "";

    return path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object" && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

export const useProductionExportData = () => {
    const [paramsfilterData, setParamsFilterData] = useState<Record<string, any>>({});
    const [filterData, setFilterData] = useState<FiltersRecord>({});
    const { data: productionExports, isLoading } = useGetProductionExportsQuery(
        paramsfilterData,
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const [displayData, setDisplayData] = useState<ProductionExportsResponse | null>(null);

    useEffect(() => {
        if (productionExports) {
            setDisplayData(productionExports);
        }
    }, [productionExports]);

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
        if (searchTerm === "" && productionExports) {
            setDisplayData(productionExports);
            return;
        }

        const lowerSearch = searchTerm.toString().toLowerCase();

        if (productionExports) {
            const result = productionExports.data.filter((row) =>
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
        productionExports: displayData,
        isLoading,
        filterData,
        setFilterData,
        handleFilterOnChange,
        handleSearch,
    };
};