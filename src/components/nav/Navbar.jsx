import NavItem from "./NavItem";
import { Menu, MenuLabel, MenuList } from "../../styles/MenuStyle";
export default function Navbar() {
  return (
    <Menu>
      <MenuLabel>Account</MenuLabel>
      <MenuList>
        <NavItem path={"/login"} name={"Login"} />
        <NavItem path={"/login"} name={"Logout"} />
      </MenuList>
      <MenuLabel>Data Management</MenuLabel>
      <MenuList>
        <NavItem path={"/search"} name={"Data Search"} />
        <NavItem path={"/upload"} name={"Data Upload"} />
      </MenuList>
      <MenuLabel>Admin</MenuLabel>
      <MenuList>
        <NavItem path={"/admin"} name={"Account Management"} />
      </MenuList>
    </Menu>
  );
}
