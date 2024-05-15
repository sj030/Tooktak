import {InputField} from "../commons/Input";
import {Button} from "../commons/Button";
import {useState} from "react";
import {useLogin} from "../../contexts/AuthContext";
import LoginLayout from "../layout/LoginLayout";

export function LoginBox() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const login = useLogin();

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
            <Button onClick={(e) => {
                e.preventDefault();
                login(id, password);
            }} children={"login"}/>
        </LoginLayout>
    );
}
