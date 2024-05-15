import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";

const ModeContext = createContext(null);
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [mode, setMode] = useState(null);
    return (
        <ModeContext.Provider value={mode}>
            <AuthContext.Provider value={setMode}>
                {children}
            </AuthContext.Provider>
        </ModeContext.Provider>
    );
};

export function useMode() {
    return useContext(ModeContext);
}

export function useLogout() {
    const setMode = useContext(AuthContext);
    //여기서 logoutApi 사용
    return () => {
        console.log(1);
        setMode(null);
    };
}

export function useLogin() {
    const navigate = useNavigate();
    const setMode = useContext(AuthContext);
    return (id, password) => {
        setMode("admin");
        navigate("/search");
    };
}