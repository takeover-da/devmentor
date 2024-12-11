import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

// styled 컴포넌트를 사용해서 div 태그 생성
const LayoutContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  /* width: 100%; */
  margin: 0 200px 0 200px;
  background-color: white;
  margin-top: 3%;
`;


const Layout = () => {
  return (
    <LayoutContainer>
      <Header/>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
