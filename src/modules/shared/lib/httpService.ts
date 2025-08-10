import axios, { type AxiosInstance } from "axios";

const kernelApi = axios.create({
  baseURL: import.meta.env.VITE_API_KERNEL_URL,
  withCredentials: true,
});

const saleApi = axios.create({
  baseURL: import.meta.env.VITE_API_SALE_URL,
  withCredentials: true,
});

const buyApi = axios.create({
  baseURL: import.meta.env.VITE_API_BUY_URL,
  withCredentials: true,
});

function setupInterceptors(apiInstance: AxiosInstance) {
  apiInstance.interceptors.request.use(
    (res) => res,
    (err) => Promise.reject(err)
  );

  apiInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;
      if (err.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_KERNEL_URL}auth/refresh`,
            { withCredentials: true }
          );
          if (data) return apiInstance(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(err);
    }
  );
}

setupInterceptors(kernelApi);
setupInterceptors(saleApi);
setupInterceptors(buyApi);

const http = { kernelApi, saleApi ,buyApi};

export default http;
