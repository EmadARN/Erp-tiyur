import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { driver, CreatedriverDto } from "../model/driver";

export const driverApi = createApi({
  reducerPath: "driverApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["driver"],
  endpoints: (builder) => ({
    getdrivers: builder.query({
      query: (filters = {}) => ({
        url: "/admin/transportation/driver/",
        method: "get",
        params: filters,
      }),
      providesTags: ["driver"],
    }),
    getdriversDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/transportation/driver/${id}/`,
        method: "get",
      }),
    }),
    postdrivers: builder.mutation<driver, Partial<CreatedriverDto>>({
      query: (body) => ({
        url: "/admin/transportation/driver/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["driver"],
    }),
    patchdrivers: builder.mutation<driver, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/transportation/driver/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["driver"],
    }),
    // deleteBulkBankAccount: builder.mutation<void, { data: { data: string[] } }>({
    //     query: ({ data }) => ({
    //         url: "/order-bank-account/",
    //         method: "delete",
    //         data,
    //     }),
    //     invalidatesTags: ["driver"],
    // }),
    deletedrivers: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/transportation/driver/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["driver"],
    }),
  }),
});

export const {
  useGetdriversQuery,
  useGetdriversDetailsQuery,
  usePostdriversMutation,
  usePatchdriversMutation,
  useDeletedriversMutation,
} = driverApi;
