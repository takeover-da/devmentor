import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../features/Login';
import { logout } from '../store/memberSlice';
import Register from '../features/Register';
import { useDispatch, useSelector } from 'react-redux';

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.37);
`;

// 마이페이지 버튼을 위한 스타일
const MyPageButton = styled.button`
  background-color: #333;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const SiteNameContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 20px;  // 메뉴 항목과의 간격을 설정
`;

const SiteName = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  color: black;
  cursor: pointer;
  border-radius: 10px;
`;

const MenuContainerWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;  // 메뉴 항목을 가능한 공간에 맞게 채우기
`;

const MenuItem = styled.div`
  position: relative;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border: 1px solid #ddd;
  width: 150px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  a {
    text-decoration: none;
    color: black;
    display: block;
  }
`;

const LoginButtonContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;  // 버튼을 오른쪽 끝으로 정렬
  position: relative;  // 자식 요소의 절대 위치 지정
  gap: 10px;
`;

const LoginButton = styled.button`
  background-color: #333;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleMouseEnter = (menu) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state에서 로그인한 사용자의 정보 가져오기
  const user = useSelector(state => state.member.info);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 사용자 정보 초기화
    dispatch(logout());

    // 사용자 정보와 토큰 삭제
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // 로그인 폼으로 전환
    setIsLogin(true);
  };

  // 마이페이지
  const handleMyPageRedirect = () => {
    if (user) {
      if (user.role === 'ADMIN') {
        navigate('/AdminMypage');
      } else if (user.role === 'INSTRUCTOR') {
        navigate('/InstructorMypage');
      } else if (user.role === 'LEARNER') {
        navigate('/LearnerMypage');
      }
    }
  };

  return (
    <HeaderContainer>
      <SiteNameContainer>
        <Link to="/Home" style={{ textDecoration: 'none' }}>
          <SiteName>Dev Mentor</SiteName>
        </Link>
      </SiteNameContainer>

      <MenuContainerWrapper>
        <MenuItem onMouseEnter={() => handleMouseEnter('menu1')} onMouseLeave={handleMouseLeave}>
          강의
          <DropdownMenu isOpen={openDropdown === 'menu1'}>
            <DropdownItem>
              <Link to="/CoursePage">전체 강의</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/RoadmapPage">로드맵</Link>
            </DropdownItem>
          </DropdownMenu>
        </MenuItem>
        <MenuItem onMouseEnter={() => handleMouseEnter('menu2')} onMouseLeave={handleMouseLeave}>
          멘토링
          <DropdownMenu isOpen={openDropdown === 'menu2'}>
            <DropdownItem>
              <Link to="/MentoringPage">멘토링 프로그램</Link>
            </DropdownItem>
          </DropdownMenu>
        </MenuItem>
        <MenuItem onMouseEnter={() => handleMouseEnter('menu3')} onMouseLeave={handleMouseLeave}>
          커뮤니티
          <DropdownMenu isOpen={openDropdown === 'menu3'}>
            <DropdownItem>
              <Link to="/CommunityPage">포럼</Link>
            </DropdownItem>
          </DropdownMenu>
        </MenuItem>
      </MenuContainerWrapper>

      {/* 로그인 / 마이페이지 / 로그아웃 버튼 */}
      { user === null ? 
        <LoginButtonContainer>
          <LoginButton onClick={openModal}>로그인</LoginButton>
        </LoginButtonContainer> 
        :
        <LoginButtonContainer>
          <MyPageButton onClick={handleMyPageRedirect}>마이페이지</MyPageButton>
          <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
        </LoginButtonContainer>
      }

      <ModalOverlay isOpen={isModalOpen} onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
          {isLogin ? (
            <Login closeModal={closeModal} />
          ) : (
            <Register />
          )}
          <ToggleButton onClick={toggleForm}>
            {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
          </ToggleButton>
        </ModalContent>
      </ModalOverlay>
    </HeaderContainer>
  );
};

export default Header;
