import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { unit, CreateunitDto } from "../model/unit";

export const unitApi = createApi({
  reducerPath: "unitApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["unit"],
  endpoints: (builder) => ({
    getunits: builder.query({
      query: (filters = {}) => ({
        url: "/admin/product/unit/",
        method: "get",
        params: filters,
      }),
      providesTags: ["unit"],
    }),
    getunitsDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/product/unit/${id}/`,
        method: "get",
      }),
    }),
    postunits: builder.mutation<unit, Partial<CreateunitDto>>({
      query: (body) => ({
        url: "/admin/product/unit/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["unit"],
    }),
    patchunits: builder.mutation<unit, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/product/unit/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["unit"],
    }),

    deleteunits: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/product/unit/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["unit"],
    }),
  }),
});

export const {
  useGetunitsQuery,
  useGetunitsDetailsQuery,
  usePostunitsMutation,
  usePatchunitsMutation,
  useDeleteunitsMutation,
} = unitApi;
