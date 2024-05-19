import React from 'react';
import { UTableRow } from './UTableLow';

export function UTable({ header, items, onRowClick, selectedRow }) {
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
                    <UTableRow 
                        key={index} 
                        header={header} 
                        item={item} 
                        onClick={() => onRowClick(item)} 
                        isSelected={selectedRow && selectedRow.username === item[0]} // assuming the first item is the unique identifier
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}
