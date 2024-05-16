import {FileDropBox} from "./FileDropBox";

export function UTableRow({header, item,path}) {
    return (<tr
        className={item.status === "finish" ? "is-selected" : ""}>
        {header.map((h) => (
            <td key={h}>{h === "files" ? <FileDropBox dirPath={path} files={item[h]}/> : item[h] ? item[h] : "null"}</td>))}
    </tr>);
}