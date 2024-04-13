export function Card({ children, header, footer }) {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{header}</p>
      </header>
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
      <footer className="card-footer ">{footer}</footer>
    </div>
  );
}
