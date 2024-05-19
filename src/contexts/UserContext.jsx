import React, { createContext, useContext, useState, useCallback } from 'react';
import axiosInstance from '../services/config/axiosInstance';
import { toast } from 'react-toastify';

const UserContext = createContext({
    users: [],
    totalUsers: 0,
    itemsPerPage: 5,  // 변경: 한 번에 5명씩 보여줌
    currentPage: 1,
    fetchUsers: () => {},
    handlePageClick: () => {},
    handleAddUser: () => {},
    handleDeleteUser: () => {},
    selectedUser: null,
    setSelectedUser: () => {},
});

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);  // 변경: 한 번에 5명씩 보여줌
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = useCallback(async (page = 1) => {
        try {
            const res = await axiosInstance.get('/account', { params: { page } });
            if (res.status === 200) {
                setUsers(res.data.data);
                setTotalUsers(res.data.total_count);
                setCurrentPage(res.data.current_page);
            }
        } catch (error) {
            setUsers([]);
            setTotalUsers(0);
        }
    }, []);

    const handleAddUser = useCallback(async (username, password) => {
        try {
            const response = await axiosInstance.post('/account/add', { username, password });
            if (response.status === 201) {
                toast.success("계정 생성 완료");
                fetchUsers(1);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("계정 생성 오류 (중복된 아이디)");
            } else {
                toast.error("서버 에러");
            }
        }
    }, [fetchUsers]);

    const handleDeleteUser = useCallback(async () => {
        if (selectedUser) {
            try {
                await axiosInstance.delete(`/account/${selectedUser.username}`);
                toast.success("계정 삭제 완료");
                fetchUsers(currentPage);
                setSelectedUser(null);
            } catch (error) {
                toast.error("계정 삭제 실패");
            }
        }
    }, [selectedUser, fetchUsers, currentPage]);

    const handlePageClick = useCallback((pageNumber) => {
        fetchUsers(pageNumber);
    }, [fetchUsers]);

    return (
        <UserContext.Provider value={{
            users, 
            totalUsers, 
            itemsPerPage, 
            currentPage, 
            fetchUsers, 
            handlePageClick, 
            handleAddUser, 
            handleDeleteUser, 
            selectedUser, 
            setSelectedUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUsers() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
}
