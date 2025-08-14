import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { TruckLoading, CreateTruckLoadingDto, TruckLoadingsResponse } from "../model/truckLoadingTypes";

export const truckLoadingApi = createApi({
    reducerPath: "truckLoadingsApi",
    baseQuery: axiosBaseQuery(http.saleApi),
    tagTypes: ["TruckLoading"],
    endpoints: (builder) => ({
        getTruckLoadings: builder.query<TruckLoadingsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/truck-loading/",
                method: "get",
                params: filters,
            }),
            providesTags: ["TruckLoading"],
        }),
        getTruckLoadingDetails: builder.query<TruckLoading, { id: string }>({
            query: ({ id }) => ({
                url: `/truck-loading/c/${id}/`,
                method: "get",
            }),
        }),
        postTruckLoading: builder.mutation<TruckLoading, Partial<CreateTruckLoadingDto>>({
            query: (body) => ({
                url: "/truck-loading/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["TruckLoading"],
        }),
        patchTruckLoading: builder.mutation<TruckLoading, { id: string; data: Partial<TruckLoading> }>({
            query: ({ id, data }) => ({
                url: `/truck-loading/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["TruckLoading"],
        }),
        deleteBulkTruckLoading: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/truck-loading/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["TruckLoading"],
        }),
        deleteTruckLoading: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/truck-loading/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["TruckLoading"],
        }),
    }),
});

export const {
    useGetTruckLoadingsQuery,
    useGetTruckLoadingDetailsQuery,
    usePostTruckLoadingMutation,
    usePatchTruckLoadingMutation,
    useDeleteBulkTruckLoadingMutation,
    useDeleteTruckLoadingMutation,
} = truckLoadingApi;