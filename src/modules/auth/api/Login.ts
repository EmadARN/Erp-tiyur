import http from "@/modules/shared/lib/httpService";
import { axiosBaseQuery } from "@/modules/shared/lib/rtkQueryBase";
import { createApi } from "@reduxjs/toolkit/query/react";

export const LoginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: axiosBaseQuery(http.kernelApi),
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials, // چون axios هست از data استفاده می‌کنیم
      }),
    }),
  }),
});

export const { useLoginMutation } = LoginApi;
