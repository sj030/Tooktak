export function Menu({ children }) {
  return <aside className="menu">{children}</aside>;
}
export function MenuLabel({ children }) {
  return <p className="menu-label">{children}</p>;
}
export function MenuList({ children }) {
  return <ul className="menu-list">{children}</ul>;
}
