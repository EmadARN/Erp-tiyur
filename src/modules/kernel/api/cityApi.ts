import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { city, CreatecityDto } from "../model/city";

export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["city"],
  endpoints: (builder) => ({
    getcitys: builder.query({
      query: (filters = {}) => ({
        url: "/admin/ownership/city/",
        method: "get",
        params: filters,
      }),
      providesTags: ["city"],
    }),
    getcitysDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/ownership/city/${id}/`,
        method: "get",
      }),
    }),
    postcitys: builder.mutation<city, Partial<CreatecityDto>>({
      query: (body) => ({
        url: "/admin/ownership/city/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["city"],
    }),
    patchcitys: builder.mutation<city, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/ownership/city/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["city"],
    }),

    deletecitys: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/ownership/city/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["city"],
    }),
  }),
});

export const {
  useGetcitysQuery,
  useGetcitysDetailsQuery,
  usePostcitysMutation,
  usePatchcitysMutation,
  useDeletecitysMutation,
} = cityApi;
