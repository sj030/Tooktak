import MenuItem from "./MenuItem";
import { Menu, MenuLabel, MenuList } from "../../styles/MenuStyle";
export default function Navbar() {
  return (
    <Menu>
      <MenuLabel>Account</MenuLabel>
      <MenuList>
        <MenuItem path={"/login"} name={"Login"} />
      </MenuList>
      <MenuLabel>Data Management</MenuLabel>
      <MenuList>
        <MenuItem path={"/search"} name={"Data Search"} />
        <MenuItem path={"/upload"} name={"Data Upload"} />
      </MenuList>
      <MenuLabel>Admin</MenuLabel>
      <MenuList>
        <MenuItem path={"/admin"} name={"Account Management"} />
      </MenuList>
    </Menu>
  );
}
