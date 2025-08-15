import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PoultryCuttingSeries, CreatePoultryCuttingSeriesDto, PoultryCuttingSeriesResponse } from "../model/poultryCuttingSeriesType";

export const poultryCuttingSeriesApi = createApi({
    reducerPath: "poultryCuttingSeriesApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["PoultryCuttingSeries"],
    endpoints: (builder) => ({
        getPoultryCuttingSeries: builder.query<PoultryCuttingSeriesResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/poultry-cutting-production-series/",
                method: "get",
                params: filters,
            }),
            providesTags: ["PoultryCuttingSeries"],
        }),
        getPoultryCuttingSeriesDetails: builder.query<PoultryCuttingSeries, { id: string }>({
            query: ({ id }) => ({
                url: `/poultry-cutting-production-series/c/${id}/`,
                method: "get",
            }),
        }),
        postPoultryCuttingSeries: builder.mutation<PoultryCuttingSeries, Partial<CreatePoultryCuttingSeriesDto>>({
            query: (body) => ({
                url: "/poultry-cutting-production-series/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["PoultryCuttingSeries"],
        }),
        patchPoultryCuttingSeries: builder.mutation<PoultryCuttingSeries, { id: string; data: Partial<PoultryCuttingSeries> }>({
            query: ({ id, data }) => ({
                url: `/poultry-cutting-production-series/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["PoultryCuttingSeries"],
        }),
        deleteBulkPoultryCuttingSeries: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/poultry-cutting-production-series/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["PoultryCuttingSeries"],
        }),
        deletePoultryCuttingSeries: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/poultry-cutting-production-series/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["PoultryCuttingSeries"],
        }),
    }),
});

export const {
    useGetPoultryCuttingSeriesQuery,
    useGetPoultryCuttingSeriesDetailsQuery,
    usePostPoultryCuttingSeriesMutation,
    usePatchPoultryCuttingSeriesMutation,
    useDeleteBulkPoultryCuttingSeriesMutation,
    useDeletePoultryCuttingSeriesMutation,
} = poultryCuttingSeriesApi;