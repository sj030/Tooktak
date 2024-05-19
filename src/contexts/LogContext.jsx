import React, { createContext, useContext, useState, useCallback } from 'react';
import { requestLogApi } from '../services/log';
import { useQueryParams, useUpdateQueryParams } from './Querycontext';

const LogContext = createContext({
    logs: [],   // 기본값으로 빈 배열 설정
    setLogs: () => { },
    fetchLogs: () => { },
    logsCount: 0,
    totalPages: 0,
    currentPage: 1,
});

export const LogProvider = ({ children }) => {
    const [logs, setLogs] = useState([]);
    const { queryParams } = useQueryParams();
    const [logsCount, setLogsCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const updateQueryParams = useUpdateQueryParams();

    const fetchLogs = useCallback(async (page) => {
        setLogs([]);
        try {
            const params = { ...queryParams, page };
            const res = await requestLogApi(params);
            if (res.status === 204) {
                setLogs([]);
                setLogsCount(0);
                setTotalPages(0);
            } else if (res.status === 200) {
                setLogs(res.data.data);
                setLogsCount(res.data.total_count);
                setTotalPages(Math.ceil(res.data.total_count / res.data.items_per_page));
                setCurrentPage(res.data.current_page);
            }
        } catch (error) {
            setLogs([]);
            setLogsCount(0);
            setTotalPages(0);
        }
    }, [queryParams]);

    const updateAndFetchLogs = useCallback(async (field, value) => {
        updateQueryParams(field, value);
        await fetchLogs(value);
    }, [fetchLogs, updateQueryParams]);

    const handlePageClick = useCallback((pageNumber) => {
        updateAndFetchLogs('page', pageNumber);
    }, [updateAndFetchLogs]);

    return (
        <LogContext.Provider value={{
            logs, 
            setLogs, 
            fetchLogs, 
            logsCount, 
            totalPages, 
            currentPage, 
            updateAndFetchLogs,
            handlePageClick
        }}>
            {children}
        </LogContext.Provider>
    );
}

export function useLogs() {
    const context = useContext(LogContext);
    if (!context) {
        throw new Error('useLogs must be used within a LogProvider');
    }
    return context;
}
