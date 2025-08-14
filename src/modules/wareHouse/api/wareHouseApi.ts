import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Warehouse, CreateWarehouseDto, WarehouseResponse } from "../model/warehouseTypes";

export const warehouseApi = createApi({
  reducerPath: "warehouseApi",
  baseQuery: axiosBaseQuery(http.wareHouseApi),
  tagTypes: ["Warehouse"],
  endpoints: (builder) => ({
    getWarehouses: builder.query<WarehouseResponse, Record<string, any>>({
      query: (filters = {}) => ({
        url: "/warehouse/",
        method: "get",
        params: filters,
      }),
      providesTags: ["Warehouse"],
    }),
    getWarehouseDetails: builder.query<Warehouse, { id: string }>({
      query: ({ id }) => ({
        url: `/warehouse/c/${id}/`,
        method: "get",
      }),
    }),
    postWarehouse: builder.mutation<Warehouse, Partial<CreateWarehouseDto>>({
      query: (body) => ({
        url: "/warehouse/create/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    patchWarehouse: builder.mutation<Warehouse, { id: string; data: Partial<Warehouse> }>({
      query: ({ id, data }) => ({
        url: `/warehouse/c/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    deleteBulkWarehouse: builder.mutation<void, { data: { data: string[] } }>({
      query: ({ data }) => ({
        url: "/warehouse/",
        method: "delete",
        data,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    deleteWarehouse: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/warehouse/c/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["Warehouse"],
    }),
  }),
});

export const {
  useGetWarehousesQuery,
  useGetWarehouseDetailsQuery,
  usePostWarehouseMutation,
  usePatchWarehouseMutation,
  useDeleteBulkWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehouseApi;