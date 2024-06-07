import axiosInstance from "./config/axiosInstance";

export async function RequestFetchUsersApi(page) {
    return axiosInstance.get('/account', { params: { page } });
}

export async function RequestCreateUserApi(username, password, role) {
    return await axiosInstance.post('/account/add', { username, password, role });
}

export async function RequestDeleteUserApi(username) {    
    return await axiosInstance.delete(`/account/${username}`);
}
