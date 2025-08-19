import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { user, CreateuserDto } from "../model/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getusers: builder.query({
      query: (filters = {}) => ({
        url: "/admin/accounts/users/",
        method: "get",
        params: filters,
      }),
      providesTags: ["user"],
    }),
    getusersDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/accounts/users/${id}/`,
        method: "get",
      }),
    }),
    postusers: builder.mutation<user, Partial<CreateuserDto>>({
      query: (body) => ({
        url: "/admin/accounts/users/",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["user"],
    }),
    patchusers: builder.mutation<user, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/accounts/users/${id}/`,
        method: "patch",
        data,
      }),
      invalidatesTags: ["user"],
    }),

    deleteusers: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/accounts/users/${id}/`,
        method: "delete",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetusersQuery,
  useGetusersDetailsQuery,
  usePostusersMutation,
  usePatchusersMutation,
  useDeleteusersMutation,
} = userApi;
