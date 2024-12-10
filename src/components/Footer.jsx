import React from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 - 푸터 스타일
const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const SocialLinks = styled.div`
  margin-top: 10px;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 18px;
  margin: 0 10px;
  text-decoration: none;
  
  &:hover {
    color: #21a1f1;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 YourCompany. All rights reserved.</FooterText>
      <SocialLinks>
        <SocialLink href="https://facebook.com" target="_blank">Facebook</SocialLink>
        <SocialLink href="https://twitter.com" target="_blank">Twitter</SocialLink>
        <SocialLink href="https://linkedin.com" target="_blank">LinkedIn</SocialLink>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer;
