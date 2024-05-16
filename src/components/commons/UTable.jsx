import {UTableRow} from "./UTableRow";

export function UTable({header, directory}) {
    console.log(header);
    console.log(directory);
    return (
        <div className={"table__wrapper"}>
            <table className="table">
                <thead>
                <tr>
                    {header.map((headerTitle) => (
                        <th key={headerTitle}>{headerTitle}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {directory.map((data) => {
                    return <UTableRow  key={data[0]} header={header} path={data[0]} item={data[1]}/>
                })}
                </tbody>
            </table>
        </div>
    );
}
