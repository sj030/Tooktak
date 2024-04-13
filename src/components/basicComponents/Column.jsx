export function Columns({ children }) {
  return <div className="columns is-fullheight">{children}</div>;
}
export function Column({ children, ratio }) {
  return <div className={`column is-${ratio}`}>{children}</div>;
}
