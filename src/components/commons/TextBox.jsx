import {useState} from "react";

export function TextBox({label, placeholder="", setText}) {
    const [value, setValue] = useState("");
    return (
        <div className="box ">
            <div className="field">
                <div className={"level"}>
                    <div className="level-left">
                    <label className="label">{label}</label>
                    </div>
                        <input
                        className="input is-primary"
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            setText(e.target.value)
                            setValue(e.target.value)
                        }}
                    />
                </div>
            </div>
        </div>);
}
