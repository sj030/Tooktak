import React, { useEffect } from 'react';
import { useUsers } from '../../../contexts/UserContext';
import { UTable } from '../../commons/UTable';
import { UserPagination } from './UserPagination';
import { ToastContainer } from 'react-toastify';
import moment from 'moment-timezone';
import 'react-toastify/dist/ReactToastify.css';

export function UserBox() {
    const { users, totalUsers, itemsPerPage, currentPage, handlePageClick, selectedUser, setSelectedUser, handleDeleteUser, fetchUsers } = useUsers();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const items = users.map(user => [
        user.username, user.role, 
        moment(user.createdAt).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'), // 한국 시간으로 변환
        moment(user.updatedAt).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')  // 한국 시간으로 변환
    ]);

    const handleRowClick = (item) => {
        const user = users.find(u => u.username === item[0]);
        setSelectedUser(user);
    };

    return (
        <div>
            <UTable
                header={["Username", "Role", "Created At", "Updated At"]}
                items={items}
                onRowClick={handleRowClick}
                selectedRow={selectedUser}
            />
            {selectedUser && (
                <button onClick={handleDeleteUser}/>
            )}
            <UserPagination
                totalPages={Math.ceil(totalUsers / itemsPerPage)}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
            />
            <ToastContainer />
        </div>
    );
}
