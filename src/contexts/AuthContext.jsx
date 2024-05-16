import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {requestLoginApi} from "../services/auth";

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
        requestLoginApi(id, password).then((res) => {
            res.json()
        }).then((data) => {
            setMode("user");
            navigate("/search");
        })
        setMode("admin");
        navigate("/search");
    };
}