import { Menu, MenuLabel, MenuList, MenuItem } from "../commons/Menu";
import logo from "../../asset/logo.png";
export default function Navigation() {
  return (
    <Menu logo={logo}>
      <MenuLabel label={"계정"} />
      <MenuList>
        <MenuItem path={"/login"} name={"로그인"} />
      </MenuList>
      <MenuLabel label={"데이터 관리"} />
      <MenuList>
        <MenuItem path={"/search"} name={"데이터 검색"} />
        <MenuItem path={"/upload"} name={"데이터 업로드"} />
      </MenuList>
      <MenuLabel label={"관리자 메뉴"} />
      <MenuList>
          <MenuItem path={"/admin"} name={"계정 관리"} />
          <MenuItem path={"/log"} name={"로그 확인"} />
      </MenuList>
    </Menu>
  );
}
