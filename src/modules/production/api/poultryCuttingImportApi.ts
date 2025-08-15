import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PoultryCuttingImport, CreatePoultryCuttingImportDto, PoultryCuttingImportsResponse } from "../model/poultryCuttingImportType";

export const poultryCuttingImportApi = createApi({
    reducerPath: "poultryCuttingImportsApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["PoultryCuttingImport"],
    endpoints: (builder) => ({
        getPoultryCuttingImports: builder.query<PoultryCuttingImportsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/poultry-cutting-production-import-product/",
                method: "get",
                params: filters,
            }),
            providesTags: ["PoultryCuttingImport"],
        }),
        getPoultryCuttingImportDetails: builder.query<PoultryCuttingImport, { id: string }>({
            query: ({ id }) => ({
                url: `/poultry-cutting-production-import-product/c/${id}/`,
                method: "get",
            }),
        }),
        postPoultryCuttingImport: builder.mutation<PoultryCuttingImport, Partial<CreatePoultryCuttingImportDto>>({
            query: (body) => ({
                url: "/poultry-cutting-production-import-product/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["PoultryCuttingImport"],
        }),
        patchPoultryCuttingImport: builder.mutation<PoultryCuttingImport, { id: string; data: Partial<PoultryCuttingImport> }>({
            query: ({ id, data }) => ({
                url: `/poultry-cutting-production-import-product/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["PoultryCuttingImport"],
        }),
        deleteBulkPoultryCuttingImport: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/poultry-cutting-production-import-product/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["PoultryCuttingImport"],
        }),
        deletePoultryCuttingImport: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/poultry-cutting-production-import-product/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["PoultryCuttingImport"],
        }),
    }),
});

export const {
    useGetPoultryCuttingImportsQuery,
    useGetPoultryCuttingImportDetailsQuery,
    usePostPoultryCuttingImportMutation,
    usePatchPoultryCuttingImportMutation,
    useDeleteBulkPoultryCuttingImportMutation,
    useDeletePoultryCuttingImportMutation,
} = poultryCuttingImportApi;