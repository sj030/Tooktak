import {useState} from "react";

export function TableRow({item, onClick}) {
    const [selected, setSelected] = useState(false);
    return (
        <tr
            onClick={() => {
                setSelected(!selected)
            }}
            className={selected ? "is-selected" : ""}>
            {item.map((d) => (
                <td>{d}</td>
            ))}
        </tr>
    );
}