import { Link } from "react-router-dom";

export default function MenuItem({ path, name }) {
  return <Link to={path}>{name}</Link>;
}
