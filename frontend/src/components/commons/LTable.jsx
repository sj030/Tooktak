import React from 'react';
import { LTableRow } from "./LTableRow";

export function LTable({ header, items, select, id }) {

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
                {Array.isArray(items) && items.map((item, index) => (
                    <LTableRow id={id} select={select} key={index} header={header} item={item} />
                ))}
                </tbody>
            </table>
        </div>
    );
}
