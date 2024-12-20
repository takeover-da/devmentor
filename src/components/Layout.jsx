import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// styled 컴포넌트를 사용해서 div 태그 생성
const LayoutContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  margin: 0 200px 0 200px;
  background-color: white;
  margin-top: 3%;

   /* 마이페이지에서는 margin을 0으로 설정 */
   ${({ isMyPage }) => isMyPage && `
    margin: 0;
  `}
`;

const Layout = () => {
  const location = useLocation();

  // 현재 페이지가 마이페이지인지 체크
  const isMyPage = location.pathname.includes('mypage');

  return (
    <LayoutContainer>
      <Header /> {/* 헤더 컴포넌트 삽입 */}
      <ContentContainer isMyPage={isMyPage}>
        <Outlet /> {/* 라우터가 렌더링할 페이지 */}
      </ContentContainer>
      <Footer /> {/* 푸터 컴포넌트 */}
    </LayoutContainer>
  );
};

export default Layout;
