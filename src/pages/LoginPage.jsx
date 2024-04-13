import { LoginBox } from "../components/LoginBox";
import { useState } from "react";
import { loginApi } from "../services/auth";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    loginApi(id, password);
  };

  return (
    <LoginBox
      id={id}
      onChangeId={(e) => setId(e.target.value)}
      password={password}
      onChangePassword={(e) => setPassword(e.target.value)}
      onLogin={handleLogin}
    />
  );
}
