export function Table({ header, item }) {
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
        {item.map((data) => (
          <tr>
            {data.map((d) => (
              <td>{d}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
