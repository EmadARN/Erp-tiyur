import axios from "axios";

const app = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false,
});

app.interceptors.request.use(
    (res) => res,
    (err) => Promise.reject(err)
);

app.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalConfig = err.config;
        if (err.response?.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}authentication/refresh-token/`,
                    { withCredentials: true }
                );
                if (data) return app(originalConfig);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(err);
    }
);

// هم کل اینستنس و هم متدها رو اکسپورت می‌کنیم
export { app };

const http = {
    get: app.get,
    post: app.post,
    delete: app.delete,
    put: app.put,
    patch: app.patch,
    request: app.request,
};

export default http;
