import { InputField } from "../basicComponents/Input";
import { Button } from "../basicComponents/Button";
import { useState } from "react";
export function LoginBox() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = async (event) => {
    event.preventDefault();
    loginApi(id, password);
  };
  return (
    <loginLayout>
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
    </loginLayout>
  );
}

function loginLayout({ children }) {
  return (
    <section className="hero has-background-grey-light is-fullheight ">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-7-tablet is-5-desktop is-6-widescreen">
              <form action="" className="box"></form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
