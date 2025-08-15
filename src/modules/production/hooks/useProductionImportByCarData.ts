import { useState, useEffect } from "react";
import { useGetProductionImportsByCarQuery } from "../api/productionImportByCarApi";
import type {
    ProductionImportByCar,
    FiltersRecord,
    ProductionImportsByCarResponse,
} from "../model/productionImportByCarType";
import { tableHead } from "../model/productionImportByCarIndex";

function getValueByPath(obj: ProductionImportByCar, path: string): unknown {
    if (!obj || !path) return "";

    return path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object" && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

export const useProductionImportByCarData = () => {
    const [paramsfilterData, setParamsFilterData] = useState<Record<string, any>>({});
    const [filterData, setFilterData] = useState<FiltersRecord>({});
    const { data: productionImportsByCar, isLoading } = useGetProductionImportsByCarQuery(
        paramsfilterData,
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const [displayData, setDisplayData] = useState<ProductionImportsByCarResponse | null>(null);

    useEffect(() => {
        if (productionImportsByCar) {
            setDisplayData(productionImportsByCar);
        }
    }, [productionImportsByCar]);

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
        if (searchTerm === "" && productionImportsByCar) {
            setDisplayData(productionImportsByCar);
            return;
        }

        const lowerSearch = searchTerm.toString().toLowerCase();

        if (productionImportsByCar) {
            const result = productionImportsByCar.data.filter((row) =>
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
        productionImportsByCar: displayData,
        isLoading,
        filterData,
        setFilterData,
        handleFilterOnChange,
        handleSearch,
    };
};