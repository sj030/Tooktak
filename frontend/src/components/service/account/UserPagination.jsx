import React from 'react';
import { useUsers } from '../../../contexts/UserContext';

export const UserPagination = () => {
    const { totalUsers, itemsPerPage, currentPage, fetchUsers } = useUsers();
    const totalPages = Math.ceil(totalUsers / itemsPerPage);
    const pageNumbers = [];
    const pagesToShow = 10;
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = Math.min(totalPages, currentPage + halfPagesToShow);

    if (currentPage - halfPagesToShow < 1) {
        endPage = Math.min(totalPages, endPage + (halfPagesToShow - (currentPage - 1)));
    }
    if (currentPage + halfPagesToShow > totalPages) {
        startPage = Math.max(1, startPage - ((currentPage + halfPagesToShow) - totalPages));
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {startPage > 1 && (
                <>
                    <button onClick={() => fetchUsers(1)}>{"<<"}</button>
                    <button onClick={() => fetchUsers(currentPage - 1)}>{"<"}</button>
                </>
            )}
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => fetchUsers(pageNumber)}
                    className={pageNumber === currentPage ? "active" : ""}
                >
                    {pageNumber}
                </button>
            ))}
            {endPage < totalPages && (
                <>
                    <button onClick={() => fetchUsers(currentPage + 1)}>{">"}</button>
                    <button onClick={() => fetchUsers(totalPages)}>{">>"}</button>
                </>
            )}
        </div>
    );
};
