import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';  // Link 컴포넌트 임포트

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <HeaderContainer>
      {/* 좌측 햄버거 메뉴 */}
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      {/* 중앙 사이트 이름 */}
      <SiteName>Dev Mentor</SiteName>

      {/* 우측 로그인 버튼 */}
      <LoginButton>로그인</LoginButton>

      {/* 사이드바 Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{ width: 250, padding: '16px' }}
        >
          <h3>Menu</h3>
          <ul>
            <li><Link to="/">Home</Link></li> {/* <a> 태그에서 <Link>로 수정 */}
            <li><Link to="/CoursePage">강의</Link></li> {/* <a> 태그에서 <Link>로 수정 */}
            <li><Link to="/RoadmapPage">로드맵</Link></li> {/* <a> 태그에서 <Link>로 수정 */}
            <li><Link to="/MentoringPage">멘토링</Link></li> {/* <a> 태그에서 <Link>로 수정 */}
            <li><Link to="/CommunityPage">커뮤니티</Link></li> {/* <a> 태그에서 <Link>로 수정 */}
          </ul>
        </div>
      </Drawer>
    </HeaderContainer>
  );
};

export default Header;
