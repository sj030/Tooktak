export function Card({ children, header, footer }) {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{header}</p>
      </header>
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
      <div className="columns">
        <div className="column is-9"></div>
        <div className="column is-5">
          <footer className="card-footer">{footer}</footer>
        </div>
      </div>
    </div>
  );
}
