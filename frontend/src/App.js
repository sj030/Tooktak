import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async () => {
        try {
            console.log("fetch");
            setError(null);
            setMsg(null);
            setLoading(true);
            const response = await axios.get("http://localhost:3001/file/get-csv-header/test");
            setMsg(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);

    if (loading) return <p>로딩...</p>;
    if (error) return <p>에러 발생</p>;
    if (!msg) return null;

    return (
        <>
            <p>{msg.header}</p>
        </>
    )
}

export default App;