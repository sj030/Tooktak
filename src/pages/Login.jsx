import { LoginBox, InputField } from "../styles/LoginStyle";
export default function Login() {
  return (
    <LoginBox>
      <InputField label="id">
        <input className="input" required />
      </InputField>
      <InputField label="password">
        <input type="password" className="input" required />
      </InputField>
      <button class="button is-success">Login</button>
    </LoginBox>
  );
}
