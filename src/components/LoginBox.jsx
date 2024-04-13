import { InputField } from "./basicComponents/Input";
import { Button } from "./basicComponents/Button";
export function LoginBox({
  id,
  password,
  onChangeId,
  onChangePassword,
  onLogin,
}) {
  return (
    <section className="hero has-background-grey-light is-fullheight ">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-7-tablet is-5-desktop is-6-widescreen">
              <form action="" className="box">
                <InputField label="id" value={id} onChange={onChangeId} />
                <InputField
                  label="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                />
                <Button onClick={onLogin} children={"login"} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
