import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ProductionSeries, CreateProductionSeriesDto, ProductionSeriesResponse } from "../model/productionSeriesType";

export const productionSeriesApi = createApi({
    reducerPath: "productionSeriesApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["ProductionSeries"],
    endpoints: (builder) => ({
        getProductionSeries: builder.query<ProductionSeriesResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/production-series/",
                method: "get",
                params: filters,
            }),
            providesTags: ["ProductionSeries"],
        }),
        getProductionSeriesDetails: builder.query<ProductionSeries, { id: string }>({
            query: ({ id }) => ({
                url: `/production-series/c/${id}/`,
                method: "get",
            }),
        }),
        postProductionSeries: builder.mutation<ProductionSeries, Partial<CreateProductionSeriesDto>>({
            query: (body) => ({
                url: "/production-series/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["ProductionSeries"],
        }),
        patchProductionSeries: builder.mutation<ProductionSeries, { id: string; data: Partial<ProductionSeries> }>({
            query: ({ id, data }) => ({
                url: `/production-series/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["ProductionSeries"],
        }),
        deleteBulkProductionSeries: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/production-series/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["ProductionSeries"],
        }),
        deleteProductionSeries: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/production-series/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["ProductionSeries"],
        }),
    }),
});

export const {
    useGetProductionSeriesQuery,
    useGetProductionSeriesDetailsQuery,
    usePostProductionSeriesMutation,
    usePatchProductionSeriesMutation,
    useDeleteBulkProductionSeriesMutation,
    useDeleteProductionSeriesMutation,
} = productionSeriesApi;