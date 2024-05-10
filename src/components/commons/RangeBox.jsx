import {useState} from "react";

export default function RangeBox({label, setRange}) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    return (<div className={"box"}>
        <div className="level">
            <div className="level-left">
                <label className="label">{label}</label>
            </div>
            <div className="field has-addons is-primary is-outlined">
                <input className="input"
                       type="number"
                       value={start}
                       onChange={(e) => {
                           setStart(e.target.value)
                           setRange("start", e.target.value)
                       }}/>
                <div className={"block"}>
                    <p className={"is-size-4"}> ~ </p>
                </div>
                <input className="input" type="number" value={end}
                       onChange={(e) => {
                           setEnd(e.target.value)
                           setRange("end", e.target.value)
                       }}/>
            </div>
        </div>
    </div>);
}