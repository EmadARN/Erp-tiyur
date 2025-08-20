import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { car, CreatecarDto } from "../model/car";

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["car"],
  endpoints: (builder) => ({
    getcars: builder.query({
      query: (filters = {}) => ({
        url: "/admin/transportation/car/",
        method: "get",
        params: filters,
      }),
      providesTags: ["car"],
    }),
    getcarsDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/transportation/car/${id}/`,
        method: "get",
      }),
    }),
    postcars: builder.mutation<car, Partial<CreatecarDto>>({
      query: (body) => ({
        url: "/admin/transportation/car/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["car"],
    }),
    patchcars: builder.mutation<car, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/transportation/car/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["car"],
    }),

    deletecars: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/transportation/car/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["car"],
    }),
  }),
});

export const {
  useGetcarsQuery,
  useGetcarsDetailsQuery,
  usePostcarsMutation,
  usePatchcarsMutation,
  useDeletecarsMutation,
} = carApi;
