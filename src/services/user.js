import axiosInstance from "./config/axiosInstance";

export async function RequestFetchUsersApi(page) {
    return axiosInstance.get('/account', { params: { page } }); // 페이지 번호를 params 객체로 전달
}

export async function RequestCreateUserApi(username, password) {
    return axiosInstance.post('/account/add', { username, password });
}

export async function RequestDeleteUserApi(username) {
    return axiosInstance.delete(`/account/${username}`); // username을 인수로 받아서 사용
}
