import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { RequestFetchUsersApi, RequestCreateUserApi, RequestDeleteUserApi } from '../services/user';

const UserContext = createContext({
    users: [],
    totalUsers: 0,
    itemsPerPage: 5,
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
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = useCallback(async (page = 1) => {
        try {
            const res = await RequestFetchUsersApi(page);
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

    const handleAddUser = useCallback(async (username, password, role) => {
        try {
            const response = await RequestCreateUserApi(username, password, role);
            if (response && response.status === 201) {
                toast.success("계정 생성 완료");
                fetchUsers(1);
            }
        } catch (error) {
            console.error("Error during user creation:", error.response ? error.response.data : error.message);
            if (error.response) {
                if (error.response.status === 409) {
                    toast.error("계정 생성 오류 (중복된 아이디)");
                } else if (error.response.status === 400) {
                    toast.error("잘못된 요청");
                } else {
                    toast.error("서버 에러");
                }
            } else {
                toast.error("네트워크 에러");
            }
        }
    }, [fetchUsers]);

    const handleDeleteUser = useCallback(async () => {
        if (selectedUser) {
            try {
                await RequestDeleteUserApi(selectedUser.username); // selectedUser 전달
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
