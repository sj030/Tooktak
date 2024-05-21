export default function DateBox({label, setStart, setEnd, start, end }) {
    
    return (<div className={"box"}>
        <div className="level">
            <div className="level-left">
                <label className="label">{label}</label>
            </div>
            <div className="field has-addons is-primary is-outlined is-fullwidth">
                <input className="input"
                       type="date"
                       value={start}
                       onChange={(e) => {
                           setStart(e.target.value)
                       }}/>
                <div className={"block"}>
                    <p className={"is-size-4"}> ~ </p>
                </div>
                <input className="input" type="date" value={end} 
                       onChange={(e) => {
                           setEnd(e.target.value)
                       }}/><p className="mx-1"/>
            </div>
        </div>
    </div>);
}