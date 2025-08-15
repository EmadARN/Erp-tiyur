import { useState, useEffect } from "react";
import { useGetProductionImportsFromWarehouseQuery } from "../api/productionImportFromWarehouseApi";
import type {
    ProductionImportFromWarehouse,
    FiltersRecord,
    ProductionImportsFromWarehouseResponse,
} from "../model/productionImportFromWarehouseType";
import { tableHead } from "../model/productionImportFromWarehouseIndex";

function getValueByPath(obj: ProductionImportFromWarehouse, path: string): unknown {
    if (!obj || !path) return "";

    return path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object" && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

export const useProductionImportFromWarehouseData = () => {
    const [paramsfilterData, setParamsFilterData] = useState<Record<string, any>>({});
    const [filterData, setFilterData] = useState<FiltersRecord>({});
    const { data: productionImportsFromWarehouse, isLoading } = useGetProductionImportsFromWarehouseQuery(
        paramsfilterData,
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const [displayData, setDisplayData] = useState<ProductionImportsFromWarehouseResponse | null>(null);

    useEffect(() => {
        if (productionImportsFromWarehouse) {
            setDisplayData(productionImportsFromWarehouse);
        }
    }, [productionImportsFromWarehouse]);

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
        if (searchTerm === "" && productionImportsFromWarehouse) {
            setDisplayData(productionImportsFromWarehouse);
            return;
        }

        const lowerSearch = searchTerm.toString().toLowerCase();

        if (productionImportsFromWarehouse) {
            const result = productionImportsFromWarehouse.data.filter((row) =>
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
        productionImportsFromWarehouse: displayData,
        isLoading,
        filterData,
        setFilterData,
        handleFilterOnChange,
        handleSearch,
    };
};