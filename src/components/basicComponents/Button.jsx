export function Button({ children, onClick }) {
  return (
    <button className="button is-success" onClick={onClick}>
      {children}
    </button>
  );
}
