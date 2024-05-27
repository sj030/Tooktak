import React from 'react';

export function UTableRow({ header, item, onClick, isSelected }) {
    return (
        <tr onClick={onClick} className={isSelected ? 'selected' : ''}>
            {header.map((key, index) => (
                <td key={index}>{item[index]}</td>
            ))}
        </tr>
    );
}
