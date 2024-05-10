import { InputField } from "../commons/Input";
import { Button } from "../commons/Button";
import { useState } from "react";
import { loginApi } from "../../services/auth";

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
  const onLogin = async (event) => {
    event.preventDefault();
    loginApi(id, password);
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
      <Button onClick={onLogin} children={"login"} />
    </LoginLayout>
  );
}
