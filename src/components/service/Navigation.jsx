import { Menu, MenuLabel, MenuList, MenuItem } from "../commons/Menu";
import Modal from "../commons/Modal";
import logo from "../../asset/logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext , useState} from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../services/config/axiosInstance";

export default function Navigation() {
  const { isLoggedin, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [showModal, setShowModal] = useState(false);

  const handleNavigation = (path) => {
    if (!isLoggedin) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const handleNavigationAdmin = async (path) => {
    if (!isLoggedin) {
      navigate('/login');
    } else {
      try {
        const response = await axiosInstance.get("/account/admin"); // GET 요청을 가정
        if (response.status === 403) {
          setShowModal(true); // 권한 없음 모달 표시
        } else {
          navigate(path); // 정상적으로 페이지 이동
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setShowModal(true); // 서버에서 403 응답을 반환한 경우
        } else {
          console.error('Error accessing the page:', error);
        }
      }
    }
  };

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Menu logo={logo}>
      <MenuLabel label={"계정"} />
      <MenuList>
        {isLoggedin ? (
          <MenuItem path="/" name="로그아웃" onClick={onLogout} />
        ) : (
          <MenuItem name="로그인" onClick={() => handleNavigation('/login')}/>
        )}
      </MenuList>
      <MenuLabel label={"데이터 관리"} />
      <MenuList>
        <MenuItem name={"데이터 검색"} onClick={() => handleNavigation('/search')} />
        <MenuItem name={"데이터 업로드"} onClick={() => handleNavigation('/upload')} />
      </MenuList>
      <MenuLabel label={"관리자 메뉴"} />
      <MenuList>
        <MenuItem name={"계정 관리"} onClick={() => handleNavigationAdmin('/admin')}/>
        <MenuItem name={"로그 확인"} onClick={() => handleNavigationAdmin('/log')}/>
      </MenuList>
      {showModal && <Modal onClose={() => setShowModal(false)}>You do not have permission to access this.</Modal>}
    </Menu>
  );
}
