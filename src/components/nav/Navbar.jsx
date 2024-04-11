import NavItem from "./NavItem";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <NavItem path={"/login"} name={"Login"} />
        <NavItem path={"/search"} name={"Search"} />
        <NavItem path={"/admin"} name={"Admin"} />
      </ul>
    </nav>
  );
}
