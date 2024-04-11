import { Link } from "react-router-dom";

export default function NavItem({ path, name }) {
  return (
    <li>
      <Link to={path}>{name}</Link>
    </li>
  );
}
