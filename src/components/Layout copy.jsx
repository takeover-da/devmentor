import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

// styled 컴포넌트를 사용해서 div 태그 생성
const LayoutContainer = styled.div`
  background-color: #e9ecef;
  display: flex;
  /* 수직방향으로 배치 (수평 or 수직) */
  flex-direction: column;
  /* 반대방향(수평)으로는 중앙에 정렬 */
  align-items: center;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Header/>
      <Outlet/>
      <Footer/>
    </LayoutContainer>
  )
}

export default Layout