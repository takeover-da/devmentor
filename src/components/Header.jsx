import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  // Link 컴포넌트 임포트

// 스타일 정의
const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.37);
`;

const SiteName = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: black;
  cursor: pointer;  // 클릭 가능하도록 추가
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;  /* SiteName과 수평 정렬되도록 */
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
  top: 100%;  /* 드롭다운이 메뉴 항목 바로 아래에 위치하도록 설정 */
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

const LoginButton = styled.button`
  background-color: rgb(0, 0, 0);
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);  // 현재 열린 드롭다운을 추적

  const handleMouseEnter = (menu) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <HeaderContainer>
      {/* SiteName을 Link로 감싸서 /Home으로 이동하도록 변경 */}
      <Link to="/Home" style={{ textDecoration: 'none' }}>
        <SiteName>Dev Mentor</SiteName>
      </Link>

      {/* 대메뉴들 */}
      <MenuContainer>
        <MenuItem
          onMouseEnter={() => handleMouseEnter('menu1')}
          onMouseLeave={handleMouseLeave}
        >
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
        <MenuItem
          onMouseEnter={() => handleMouseEnter('menu2')}
          onMouseLeave={handleMouseLeave}
        >
          멘토링
          <DropdownMenu isOpen={openDropdown === 'menu2'}>
            <DropdownItem>
              <Link to="/MentoringPage">멘토링 프로그램</Link>
            </DropdownItem>
          </DropdownMenu>
        </MenuItem>
        <MenuItem
          onMouseEnter={() => handleMouseEnter('menu3')}
          onMouseLeave={handleMouseLeave}
        >
          커뮤니티
          <DropdownMenu isOpen={openDropdown === 'menu3'}>
            <DropdownItem>
              <Link to="/CommunityPage">포럼</Link>
            </DropdownItem>
          </DropdownMenu>
        </MenuItem>
      </MenuContainer>

      {/* 우측 로그인 버튼 */}
      <LoginButton>로그인</LoginButton>
    </HeaderContainer>
  );
};

export default Header;
