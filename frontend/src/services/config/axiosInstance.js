import axios from 'axios';
import { getCookie } from "./cookies";

const baseURL = "/api/"; // Nginx가 /api/ 경로로 백엔드 요청을 프록시함

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

export default axiosInstance;