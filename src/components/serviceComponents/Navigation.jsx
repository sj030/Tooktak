import { Menu, MenuLabel, MenuList, MenuItem } from "../basicComponents/Menu";
import logo from "../asset/logo.png";
export default function Navigation() {
  return (
    <Menu logo={logo}>
      <MenuLabel label={"계정"} />
      <MenuList>
        <MenuItem path={"/login"} name={"Login"} />
      </MenuList>
      <MenuLabel label={"데이터 관리"} />
      <MenuList>
        <MenuItem path={"/search"} name={"Data Search"} />
        <MenuItem path={"/upload"} name={"Data Upload"} />
      </MenuList>
      <MenuLabel label={"관리자 메뉴"} />
      <MenuList>
        <MenuItem path={"/admin"} name={"Account Management"} />
      </MenuList>
    </Menu>
  );
}
