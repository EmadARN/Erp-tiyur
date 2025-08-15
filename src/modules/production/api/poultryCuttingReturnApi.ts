import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PoultryCuttingReturn, CreatePoultryCuttingReturnDto, PoultryCuttingReturnsResponse } from "../model/poultryCuttingReturnType";

export const poultryCuttingReturnApi = createApi({
    reducerPath: "poultryCuttingReturnsApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["PoultryCuttingReturn"],
    endpoints: (builder) => ({
        getPoultryCuttingReturns: builder.query<PoultryCuttingReturnsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/poultry-cutting-production-return-product/",
                method: "get",
                params: filters,
            }),
            providesTags: ["PoultryCuttingReturn"],
        }),
        getPoultryCuttingReturnDetails: builder.query<PoultryCuttingReturn, { id: string }>({
            query: ({ id }) => ({
                url: `/poultry-cutting-production-return-product/c/${id}/`,
                method: "get",
            }),
        }),
        postPoultryCuttingReturn: builder.mutation<PoultryCuttingReturn, Partial<CreatePoultryCuttingReturnDto>>({
            query: (body) => ({
                url: "/poultry-cutting-production-return-product/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["PoultryCuttingReturn"],
        }),
        patchPoultryCuttingReturn: builder.mutation<PoultryCuttingReturn, { id: string; data: Partial<PoultryCuttingReturn> }>({
            query: ({ id, data }) => ({
                url: `/poultry-cutting-production-return-product/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["PoultryCuttingReturn"],
        }),
        deleteBulkPoultryCuttingReturn: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/poultry-cutting-production-return-product/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["PoultryCuttingReturn"],
        }),
        deletePoultryCuttingReturn: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/poultry-cutting-production-return-product/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["PoultryCuttingReturn"],
        }),
    }),
});

export const {
    useGetPoultryCuttingReturnsQuery,
    useGetPoultryCuttingReturnDetailsQuery,
    usePostPoultryCuttingReturnMutation,
    usePatchPoultryCuttingReturnMutation,
    useDeleteBulkPoultryCuttingReturnMutation,
    useDeletePoultryCuttingReturnMutation,
} = poultryCuttingReturnApi;