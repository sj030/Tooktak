import {useState} from "react";

export function TableRow({item, onClick=null}) {
    const [selected, setSelected] = useState(false);
    return (
        <tr
            onClick={() => {
                setSelected(!selected)
                onClick && onClick()
            }}
            className={selected ? "is-selected" : ""}>
            {item.map((d) => (
                <td>{d}</td>
            ))}
        </tr>
    );
}