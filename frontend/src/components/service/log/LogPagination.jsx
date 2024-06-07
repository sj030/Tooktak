import { useLogs } from '../../../contexts/LogContext';

export function LogPagination() {
    const { totalPages, currentPage, handlePageClick } = useLogs();

    const pageNumbers = [];
    const pagesToShow = 10; // 한 번에 보여줄 페이지 수
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
                    <button onClick={() => handlePageClick(1)}>{"<<"}</button>
                    <button onClick={() => handlePageClick(currentPage - 1)}>{"<"}</button>
                </>
            )}
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={pageNumber === currentPage ? "active" : ""}
                >
                    {pageNumber}
                </button>
            ))}
            {endPage < totalPages && (
                <>
                    <button onClick={() => handlePageClick(currentPage + 1)}>{">"}</button>
                    <button onClick={() => handlePageClick(totalPages)}>{">>"}</button>
                </>
            )}
        </div>
    );
}
