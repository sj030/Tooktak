import React, { createContext, useContext, useState } from 'react';
import { removeCookie } from '../services/config/cookies';

// Context 생성
export const AuthContext = createContext(null);

// Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedin(true);
        setUser(userData);
    };

    const logout = () => {
        setIsLoggedin(false);
        setUser(null);
        removeCookie('Authorization');
        removeCookie('RefreshToken');
    };

    return (
        <AuthContext.Provider value={{ isLoggedin, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
