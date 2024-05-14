import { InputField } from "../commons/Input";
import { Button } from "../commons/Button";
import { useState, useContext } from "react";
import { loginApi } from "../../services/auth";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const LoginLayout = function ({ children }) {
  return (
    <section className="hero has-background-grey-light is-fullheight ">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-7-tablet is-5-desktop is-6-widescreen">
              <form action="" className="box">
                {children}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export function LoginBox() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);  // AuthContext에서 login 함수 사용
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용


  const onLogin = async (event) => {
    event.preventDefault();
    setError("");
    loginApi(id, password,
      user => {
        login(user);
        navigate('/'); // 홈 페이지로 리다이렉션
      },
      error => {
        setError(error);
      }
    );
  };
  return (
    <LoginLayout>
      <InputField
        label="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <InputField
        label="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="has-text-danger">{error}</p>}
      <Button onClick={onLogin} children={"login"} />
    </LoginLayout>
  );
}
