import React from 'react';

export function LTableRow({ header, item, select, id }) {

    return (
        <tr>
            {header.map((key, index) => (
                <td key={index}>{item[index]}</td>
            ))}
        </tr>
    );
}
