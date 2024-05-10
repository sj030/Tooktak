import {TableRow} from "./TableRow";

export function Table({header, items}) {
    return (
        <div className={"table__wrapper"}>
        <table className="table">
            <thead>
            <tr>
                {header.map((header) => (
                    <th>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {Object.entries(items).map((data) => {
                return <TableRow key={data[0]} item={data[1]} />
            })}
            </tbody>
        </table>
        </div>
    );
}
