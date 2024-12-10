import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

// 색상 팔레트 및 반응형 디자인을 위한 미디어 쿼리
const theme = {
  colors: {
    primary: '#21a1f1',
    background: '#f4f4f4',
    white: '#ffffff',
    textLight: '#888',
    textDark: '#555'
  },
  media: {
    mobile: '@media (max-width: 768px)',
    tablet: '@media (max-width: 1024px)'
  }
};

// 배너 스타일
const BannerContainer = styled.div`
  background-image: url('https://picsum.photos/1200/350');
  background-size: cover;
  background-position: center;
  height: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;

  ${theme.media.mobile} {
    height: 250px;
  }
`;

const BannerTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;

  ${theme.media.mobile} {
    font-size: 24px;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 18px;
  margin-top: 0;

  ${theme.media.mobile} {
    font-size: 14px;
  }
`;

// 필터와 검색 영역
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: ${theme.colors.background};

  ${theme.media.mobile} {
    flex-direction: column;
    gap: 10px;
  }
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #ccc;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  width: 300px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  
  &:hover {
    background-color: #1a8ec9;
  }
`;

// 카드 콘텐츠 영역
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  padding: 20px;

  ${theme.media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CardJob = styled.p`
  font-size: 14px;
  color: ${theme.colors.textDark};
`;

const CardExperience = styled.p`
  font-size: 14px;
  color: ${theme.colors.textDark};
`;

const CardAuthor = styled.p`
  font-size: 14px;
  color: ${theme.colors.textLight};
  margin-top: 10px;
`;

// 페이지네이션 영역
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  border: 1px solid #ccc;
  margin: 0 5px;
  background-color: white;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #f4f4f4;
  }
`;

const MentoringPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 예시 데이터 (기존 데이터 유지)
  const contentData = [
    { title: '멘토링 1', job: '프로그래머', experience: '5년', author: '김정환' },
    { title: '멘토링 2', job: '디자이너', experience: '3년', author: '홍길동' },
    { title: '멘토링 1', job: '프로그래머', experience: '5년', author: '김정환' },
    { title: '멘토링 2', job: '디자이너', experience: '3년', author: '홍길동' },
    { title: '멘토링 1', job: '프로그래머', experience: '5년', author: '김정환' },
    { title: '멘토링 2', job: '디자이너', experience: '3년', author: '홍길동' },
    // ... (나머지 기존 데이터)
  ];

  // useMemo를 사용해 페이지네이션 최적화
  const paginatedContent = useMemo(() => {
    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return contentData.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleSearch = () => {
    console.log('검색어:', searchQuery);
    // 실제 검색 로직 구현 예정
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(contentData.length / 4);

  return (
    <div>
      <BannerContainer>
        <BannerTitle>멘토링 플랫폼</BannerTitle>
        <BannerSubtitle>
          전문가와 소통하며 실무 인사이트를 얻어보세요
        </BannerSubtitle>
      </BannerContainer>

      <FilterContainer>
        <div>
          <FilterButton>직군 필터</FilterButton>
          <FilterButton>경력 필터</FilterButton>
        </div>
        <SearchBox>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="멘토 또는 주제 검색..."
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchBox>
      </FilterContainer>

      <ContentContainer>
        {paginatedContent.map((item, index) => (
          <ContentCard key={index}>
            <CardTitle>{item.title}</CardTitle>
            <CardJob>{item.job}</CardJob>
            <CardExperience>경력 {item.experience}</CardExperience>
            <CardAuthor>멘토: {item.author}</CardAuthor>
          </ContentCard>
        ))}
      </ContentContainer>

      <PaginationContainer>
        <PageButton 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          이전
        </PageButton>
        <span>{currentPage} / {totalPages}</span>
        <PageButton 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          다음
        </PageButton>
      </PaginationContainer>
    </div>
  );
};

export default MentoringPage;