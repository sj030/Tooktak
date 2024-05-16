import axiosInstance from './config/axiosInstance';
import {removeCookie, setCookie} from '../services/config/cookies';

export async function loginApi(id, pw, onSuccess, onError) {
    try {
        const response = await axiosInstance.post("account/login", {
            username: id,
            password: pw,
        });
        const {accessToken, refreshToken, user} = response.data.data;

        if (!accessToken || !refreshToken) {
            console.error("Missing tokens:", response.data);
            onError("Login failed: Missing tokens");
            return;
        }

        setCookie('Authorization', accessToken, {path: '/', secure: false}); // 운영 환경에 맞게 secure 옵션 조정
        setCookie('RefreshToken', refreshToken, {path: '/', secure: false});
        onSuccess(user);
    } catch (error) {
        console.error('Error:', error);
        onError("Login failed: " + error.message);
    }
}

export async function logout() {
        removeCookie('Authorization');
        removeCookie('RefreshToken');
}