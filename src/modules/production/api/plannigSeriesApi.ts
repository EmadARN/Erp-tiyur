import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PlanningSeries, CreatePlanningSeriesDto, PlanningSeriesResponse } from "../model/planningSeriesType";

export const planningSeriesApi = createApi({
    reducerPath: "planningSeriesApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["PlanningSeries"],
    endpoints: (builder) => ({
        getPlanningSeries: builder.query<PlanningSeriesResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/planning-series/",
                method: "get",
                params: filters,
            }),
            providesTags: ["PlanningSeries"],
        }),
        getPlanningSeriesDetails: builder.query<PlanningSeries, { id: string }>({
            query: ({ id }) => ({
                url: `/planning-series/c/${id}/`,
                method: "get",
            }),
        }),
        postPlanningSeries: builder.mutation<PlanningSeries, Partial<CreatePlanningSeriesDto>>({
            query: (body) => ({
                url: "/planning-series/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["PlanningSeries"],
        }),
        patchPlanningSeries: builder.mutation<PlanningSeries, { id: string; data: Partial<PlanningSeries> }>({
            query: ({ id, data }) => ({
                url: `/planning-series/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["PlanningSeries"],
        }),
        deleteBulkPlanningSeries: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/planning-series/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["PlanningSeries"],
        }),
        deletePlanningSeries: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/planning-series/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["PlanningSeries"],
        }),
    }),
});

export const {
    useGetPlanningSeriesQuery,
    useGetPlanningSeriesDetailsQuery,
    usePostPlanningSeriesMutation,
    usePatchPlanningSeriesMutation,
    useDeleteBulkPlanningSeriesMutation,
    useDeletePlanningSeriesMutation,
} = planningSeriesApi;