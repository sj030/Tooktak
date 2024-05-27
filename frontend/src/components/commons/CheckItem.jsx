export default function CheckItem({label, setChecked}) {
    return <span className="tag is-success is-light">
        <label className="checkbox">
            <input type="checkbox" onChange={setChecked}/>
            {label}
        </label>
    </span>
}