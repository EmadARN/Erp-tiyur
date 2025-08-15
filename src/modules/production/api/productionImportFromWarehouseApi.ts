import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ProductionImportFromWarehouse, CreateProductionImportFromWarehouseDto, ProductionImportsFromWarehouseResponse } from "../model/productionImportFromWarehouseType";

export const productionImportFromWarehouseApi = createApi({
    reducerPath: "productionImportsFromWarehouseApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["ProductionImportFromWarehouse"],
    endpoints: (builder) => ({
        getProductionImportsFromWarehouse: builder.query<ProductionImportsFromWarehouseResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/production-import-product-from-warehouse/",
                method: "get",
                params: filters,
            }),
            providesTags: ["ProductionImportFromWarehouse"],
        }),
        getProductionImportFromWarehouseDetails: builder.query<ProductionImportFromWarehouse, { id: string }>({
            query: ({ id }) => ({
                url: `/production-import-product-from-warehouse/c/${id}/`,
                method: "get",
            }),
        }),
        postProductionImportFromWarehouse: builder.mutation<ProductionImportFromWarehouse, Partial<CreateProductionImportFromWarehouseDto>>({
            query: (body) => ({
                url: "/production-import-product-from-warehouse/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["ProductionImportFromWarehouse"],
        }),
        patchProductionImportFromWarehouse: builder.mutation<ProductionImportFromWarehouse, { id: string; data: Partial<ProductionImportFromWarehouse> }>({
            query: ({ id, data }) => ({
                url: `/production-import-product-from-warehouse/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["ProductionImportFromWarehouse"],
        }),
        deleteBulkProductionImportFromWarehouse: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/production-import-product-from-warehouse/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["ProductionImportFromWarehouse"],
        }),
        deleteProductionImportFromWarehouse: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/production-import-product-from-warehouse/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["ProductionImportFromWarehouse"],
        }),
    }),
});

export const {
    useGetProductionImportsFromWarehouseQuery,
    useGetProductionImportFromWarehouseDetailsQuery,
    usePostProductionImportFromWarehouseMutation,
    usePatchProductionImportFromWarehouseMutation,
    useDeleteBulkProductionImportFromWarehouseMutation,
    useDeleteProductionImportFromWarehouseMutation,
} = productionImportFromWarehouseApi;