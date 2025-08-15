import { useState, useEffect } from "react";
import { useGetProductionReturnProductsQuery } from "../api/productionReturnProductApi";
import type {
    ProductionReturnProduct,
    FiltersRecord,
    ProductionReturnProductsResponse,
} from "../model/productionReturnProductType";
import { tableHead } from "../model/productionReturnProductIndex";

function getValueByPath(obj: ProductionReturnProduct, path: string): unknown {
    if (!obj || !path) return "";

    return path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object" && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

export const useProductionReturnProductData = () => {
    const [paramsfilterData, setParamsFilterData] = useState<Record<string, any>>({});
    const [filterData, setFilterData] = useState<FiltersRecord>({});
    const { data: productionReturnProducts, isLoading } = useGetProductionReturnProductsQuery(
        paramsfilterData,
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const [displayData, setDisplayData] = useState<ProductionReturnProductsResponse | null>(null);

    useEffect(() => {
        if (productionReturnProducts) {
            setDisplayData(productionReturnProducts);
        }
    }, [productionReturnProducts]);

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
        if (searchTerm === "" && productionReturnProducts) {
            setDisplayData(productionReturnProducts);
            return;
        }

        const lowerSearch = searchTerm.toString().toLowerCase();

        if (productionReturnProducts) {
            const result = productionReturnProducts.data.filter((row) =>
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
        productionReturnProducts: displayData,
        isLoading,
        filterData,
        setFilterData,
        handleFilterOnChange,
        handleSearch,
    };
};