import axios from 'axios';
import { setCookie, getCookie } from "./cookies";


const baseURL = 'http://localhost:3001/'; // cors의 경우 서버에서 처리함

const axiosInstance = axios.create({
    baseURL: baseURL, // API의 기본 URL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accesstoken = getCookie("Authorization");
    if (accesstoken) {
        config.headers["Authorization"] = `Bearer ${accesstoken}`;
    }
    console.log(config.headers["Authorization"]);
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.config && !error.config._retry && error.response && error.response.status === 401) {
            error.config._retry = true;
            const refreshtoken = getCookie("RefreshToken");
            try {
                const res = await axiosInstance.post('account/refresh', { refreshToken: refreshtoken });
                if (res.status === 200 && res.data.data.accessToken) {
                    setCookie("Authorization", res.data.data.accessToken, {});
                    error.config.headers["Authorization"] = `Bearer ${getCookie("Authorization")}`;
                    return axiosInstance(error.config);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;