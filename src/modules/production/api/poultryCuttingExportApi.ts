import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PoultryCuttingExport, CreatePoultryCuttingExportDto, PoultryCuttingExportsResponse } from "../model/poultryCuttingExportType";

export const poultryCuttingExportApi = createApi({
    reducerPath: "poultryCuttingExportsApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["PoultryCuttingExport"],
    endpoints: (builder) => ({
        getPoultryCuttingExports: builder.query<PoultryCuttingExportsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/poultry-cutting-production-export-product/",
                method: "get",
                params: filters,
            }),
            providesTags: ["PoultryCuttingExport"],
        }),
        getPoultryCuttingExportDetails: builder.query<PoultryCuttingExport, { id: string }>({
            query: ({ id }) => ({
                url: `/poultry-cutting-production-export-product/c/${id}/`,
                method: "get",
            }),
        }),
        postPoultryCuttingExport: builder.mutation<PoultryCuttingExport, Partial<CreatePoultryCuttingExportDto>>({
            query: (body) => ({
                url: "/poultry-cutting-production-export-product/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["PoultryCuttingExport"],
        }),
        patchPoultryCuttingExport: builder.mutation<PoultryCuttingExport, { id: string; data: Partial<PoultryCuttingExport> }>({
            query: ({ id, data }) => ({
                url: `/poultry-cutting-production-export-product/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["PoultryCuttingExport"],
        }),
        deleteBulkPoultryCuttingExport: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/poultry-cutting-production-export-product/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["PoultryCuttingExport"],
        }),
        deletePoultryCuttingExport: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/poultry-cutting-production-export-product/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["PoultryCuttingExport"],
        }),
    }),
});

export const {
    useGetPoultryCuttingExportsQuery,
    useGetPoultryCuttingExportDetailsQuery,
    usePostPoultryCuttingExportMutation,
    usePatchPoultryCuttingExportMutation,
    useDeleteBulkPoultryCuttingExportMutation,
    useDeletePoultryCuttingExportMutation,
} = poultryCuttingExportApi;