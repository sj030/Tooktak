export function Table({ header, items }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {header.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((data) => {
          if (data[0] === "문찬규" || data[0] === "김민수") {
            return (
              <tr className="is-selected">
                {data.map((d) => (
                  <td>{d}</td>
                ))}
              </tr>
            );
          } else {
            return (
              <tr>
                {data.map((d) => (
                  <td>{d}</td>
                ))}
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
}
