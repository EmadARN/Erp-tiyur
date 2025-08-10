import type { AxiosRequestConfig, AxiosInstance } from "axios";
import type { AxiosError } from "axios";

type Method = "get" | "post" | "put" | "patch" | "delete";

export const axiosBaseQuery =
  (apiInstance: AxiosInstance) =>
  async ({
    url,
    method,
    data,
    params,
  }: {
    url: string;
    method: Method;
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
  }) => {
    try {
      const result = await apiInstance.request({
        url,
        method,
        data,
        params,
        withCredentials: true,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
