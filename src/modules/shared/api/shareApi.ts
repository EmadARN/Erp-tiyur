import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const shareApi = createApi({
  reducerPath: "shareApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  tagTypes: ["shareApi"], // تعریف تگ برای مدیریت کش
  endpoints: (builder) => ({
    getProduct: builder.query<any, any>({
      query: (filters = {}) => ({
        url: "/admin/product/product/",
        method: "get",
        params: filters,
      }),
      providesTags: ["shareApi"],
    }),

    getProductOwner: builder.query<any, any>({
      query: (filters = {}) => ({
        url: "/admin/ownership/product-owner/",
        method: "get",
        params: filters,
      }),
      providesTags: ["shareApi"],
    }),

    getCar: builder.query<any, any>({
      query: (filters = {}) => ({
        url: "/admin/transportation/car/",
        method: "get",
        params: filters,
      }),
      providesTags: ["shareApi"],
    }),

    getDriver: builder.query<any, any>({
      query: (filters = {}) => ({
        url: "/admin/transportation/driver/",
        method: "get",
        params: filters,
      }),
      providesTags: ["shareApi"],
    }),

    getAgriculture: builder.query<any, any>({
      query: (filters = {}) => ({
        url: "/admin/ownership/agriculture/",
        method: "get",
        params: filters,
      }),
      providesTags: ["shareApi"],
    }),

    getCity: builder.query<any, any>({
      query: (filters = {}) => ({
        url: "/admin/ownership/city/",
        method: "get",
        params: filters,
      }),
      providesTags: ["shareApi"],
    }),

    getUnits: builder.query<any, any>({
      query: (filters = {}) => ({
        url: "/admin/product/unit/",
        method: "get",
        params: filters,
      }),
      providesTags: ["shareApi"],
    }),

    getRoles: builder.query<any, any>({
      query: (filters = {}) => ({
        url: "/admin/accounts/role/",
        method: "get",
        params: filters,
      }),
      providesTags: ["shareApi"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetUnitsQuery,
  useGetProductOwnerQuery,
  useGetCarQuery,
  useGetRolesQuery,
  useGetDriverQuery,
  useGetAgricultureQuery,
  useGetCityQuery,
} = shareApi;
