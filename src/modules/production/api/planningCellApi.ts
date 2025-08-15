import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PlanningCell, CreatePlanningCellDto, PlanningCellsResponse } from "../model/planningCellType";

export const planningCellApi = createApi({
    reducerPath: "planningCellsApi",
    baseQuery: axiosBaseQuery(http.productionApi),
    tagTypes: ["PlanningCell"],
    endpoints: (builder) => ({
        getPlanningCells: builder.query<PlanningCellsResponse, Record<string, any>>({
            query: (filters = {}) => ({
                url: "/planning-cell/",
                method: "get",
                params: filters,
            }),
            providesTags: ["PlanningCell"],
        }),
        getPlanningCellDetails: builder.query<PlanningCell, { id: string }>({
            query: ({ id }) => ({
                url: `/planning-cell/c/${id}/`,
                method: "get",
            }),
        }),
        postPlanningCell: builder.mutation<PlanningCell, Partial<CreatePlanningCellDto>>({
            query: (body) => ({
                url: "/planning-cell/create/",
                method: "post",
                data: body,
            }),
            invalidatesTags: ["PlanningCell"],
        }),
        patchPlanningCell: builder.mutation<PlanningCell, { id: string; data: Partial<PlanningCell> }>({
            query: ({ id, data }) => ({
                url: `/planning-cell/c/${id}/`,
                method: "patch",
                data,
            }),
            invalidatesTags: ["PlanningCell"],
        }),
        deleteBulkPlanningCell: builder.mutation<void, { data: { data: string[] } }>({
            query: ({ data }) => ({
                url: "/planning-cell/",
                method: "delete",
                data,
            }),
            invalidatesTags: ["PlanningCell"],
        }),
        deletePlanningCell: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/planning-cell/c/${id}/`,
                method: "delete",
            }),
            invalidatesTags: ["PlanningCell"],
        }),
    }),
});

export const {
    useGetPlanningCellsQuery,
    useGetPlanningCellDetailsQuery,
    usePostPlanningCellMutation,
    usePatchPlanningCellMutation,
    useDeleteBulkPlanningCellMutation,
    useDeletePlanningCellMutation,
} = planningCellApi;