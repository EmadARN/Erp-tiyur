import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ProductionExport, CreateProductionExportDto, ProductionExportsResponse } from "../model/productionExportType";

export const productionExportApi = createApi({
    reducerPath: "productionExportsApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["ProductionExport"],
    endpoints: (builder) => ({
        getProductionExports: builder.query<ProductionExportsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/production-export-product/",
                method: "get",
                params: filters,
            }),
            providesTags: ["ProductionExport"],
        }),
        getProductionExportDetails: builder.query<ProductionExport, { id: string }>({
            query: ({ id }) => ({
                url: `/production-export-product/c/${id}/`,
                method: "get",
            }),
        }),
        postProductionExport: builder.mutation<ProductionExport, Partial<CreateProductionExportDto>>({
            query: (body) => ({
                url: "/production-export-product/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["ProductionExport"],
        }),
        patchProductionExport: builder.mutation<ProductionExport, { id: string; data: Partial<ProductionExport> }>({
            query: ({ id, data }) => ({
                url: `/production-export-product/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["ProductionExport"],
        }),
        deleteBulkProductionExport: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/production-export-product/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["ProductionExport"],
        }),
        deleteProductionExport: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/production-export-product/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["ProductionExport"],
        }),
    }),
});

export const {
    useGetProductionExportsQuery,
    useGetProductionExportDetailsQuery,
    usePostProductionExportMutation,
    usePatchProductionExportMutation,
    useDeleteBulkProductionExportMutation,
    useDeleteProductionExportMutation,
} = productionExportApi;