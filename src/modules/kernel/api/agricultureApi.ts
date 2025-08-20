import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { agriculture, CreateagricultureDto } from "../model/agriculture";

export const agricultureApi = createApi({
  reducerPath: "agricultureApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["agriculture"],
  endpoints: (builder) => ({
    getagricultures: builder.query({
      query: (filters = {}) => ({
        url: "/admin/ownership/agriculture/",
        method: "get",
        params: filters,
      }),
      providesTags: ["agriculture"],
    }),
    getagriculturesDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/ownership/agriculture/${id}/`,
        method: "get",
      }),
    }),
    postagricultures: builder.mutation<agriculture, Partial<CreateagricultureDto>>({
      query: (body) => ({
        url: "/admin/ownership/agriculture/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["agriculture"],
    }),
    patchagricultures: builder.mutation<agriculture, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/ownership/agriculture/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["agriculture"],
    }),

    deleteagricultures: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/ownership/agriculture/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["agriculture"],
    }),
  }),
});

export const {
  useGetagriculturesQuery,
  useGetagriculturesDetailsQuery,
  usePostagriculturesMutation,
  usePatchagriculturesMutation,
  useDeleteagriculturesMutation,
} = agricultureApi;
