import { Link } from "react-router-dom";

export default function NavItem({ path, name }) {
  return <Link to={path}>{name}</Link>;
}
