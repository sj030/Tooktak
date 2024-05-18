import React, { createContext, useContext, useState, useCallback } from 'react';

const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
    const [queryParams, setQueryParams] = useState({
        username: "",
        role: "",
        ip: "",
        f_name: "",
        date: "",
        page: 1 
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const updateQueryParams = useCallback((field, value) => {
        setQueryParams(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const setDateRange = useCallback((startDate, endDate) => {
        const dateRange = `${startDate}_to_${endDate}`;
        setQueryParams(prev => ({
            ...prev,
            date: dateRange
        }));
    }, []);

    const setStart = useCallback((startDate) => {
        setStartDate(startDate);
    }, []);

    const setEnd = useCallback((endDate) => {
        setEndDate(endDate);
    }, []);
    
    return (
        <QueryContext.Provider value={{ queryParams, setQueryParams, setDateRange, updateQueryParams, startDate, setStart, endDate, setEnd}}>
            {children}
        </QueryContext.Provider>
    );
};

export function useQueryParams() {
    const context = useContext(QueryContext);
    if (!context) {
        throw new Error("useQueryParams must be used within a QueryProvider");
    }
    return context;
}

export function useUpdateQueryParams() {
    const context = useContext(QueryContext);
    if (!context) {
        throw new Error("useUpdateQueryParams must be used within a QueryProvider");
    }
    return context.updateQueryParams;
};

export function useSetStart() {
    const context = useContext(QueryContext);
    if (!context) {
        throw new Error("useUpdateQueryParams must be used within a QueryProvider");
    }
    return context.setStart;
};


export function useSetEnd() {
    const context = useContext(QueryContext);
    if (!context) {
        throw new Error("useUpdateQueryParams must be used within a QueryProvider");
    }
    return context.setEnd;
};
export function useSetDateRange() {
    const context = useContext(QueryContext);
    if (!context) {
        throw new Error("useSetDateRange must be used within a QueryProvider");
    }
    return context.setDateRange;
};