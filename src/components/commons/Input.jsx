export function Input({type, placeholder, value, onChange}) {
    return (
        <input
            type={type}
            className="input"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

export function InputField({label, value, onChange, type}) {
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control has-icons-left">
                <Input value={value} onChange={onChange} type={type}/>
            </div>
        </div>
    );
}
