import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트
const RoadmapContainer = styled.div`
  display: flex;
  flex-direction: column; /* 상단-헤더 포함 */
  align-items: center;
`;

const ImageHeaderContainer = styled.div`
  background-image: url('header-image.jpg'); /* 배경 이미지 경로 */
  height: 300px; /* 배경 이미지 높이 */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-size: cover;
  background-position: center;
  margin-top: 80px; /* 고정 헤더 아래로 이동 */
  position: relative;
`;

const HeaderTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 15px;
  border-radius: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
  outline: none;
  width: 300px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #21a1f1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #1a8ec9;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px;
  margin-top: 20px; /* 헤더와 이미지 영역 아래로 */
`;

const FilterContainer = styled.div`
  width: 250px;
  position: sticky;
  top: 100px; /* 고정된 위치로 필터 유지 */
  padding: 20px;
  background-color: #f4f4f4;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 100px);
  overflow-y: auto;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const FilterList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FilterItem = styled.li`
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    color: #21a1f1;
  }
`;

const CourseContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  margin-left: 20px;
`;

const CourseCard = styled.div`
  width: 22%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px;
`;

const CourseImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const CourseTitle = styled.h4`
  font-size: 18px;
  margin-top: 10px;
`;

const CourseDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

const RoadmapPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 예시 강의 데이터
  const courses = [
    { title: '김영한의 실전 자바 -기본편', image: 'https://via.placeholder.com/150?text=Course+1', description: '김영한', category: '개발,프로그래밍' },
    { title: 'Windows 시스템 프로그래밍 - 기본', image: 'https://via.placeholder.com/150?text=Course+2', description: '널널한 개발자', category: '게임개발' },
    { title: '파이썬 주식 매매 봇으로 주식시장 자동사냥하기', image: 'https://via.placeholder.com/150?text=Course+3', description: 'MoneyPouch', category: '데이터사이언스' },
    { title: '김영한의 실전 자바 -중급편', image: 'https://via.placeholder.com/150?text=Course+4', description: '김영한', category: '개발,프로그래밍' },
    { title: '[백문이불여일타] 데이터 분석을 위한 기초 SQL', image: 'https://via.placeholder.com/150?text=Course+5', description: '데이터리안', category: '데이터사이언스' },
    { title: '[켠김에 출시까지] UE5 다크앤다커 스타일의 익스트랙션 RPG (D1)', image: 'https://via.placeholder.com/150?text=Course+6', description: 'Rookiss', category: '게임개발' },
    { title: '웹 개발의 핵심, HTTP 완벽마스터하기!', image: 'https://via.placeholder.com/150?text=Course+1', description: '김정환', category: '개발,프로그래밍' },
    { title: '[게임 프로그래머 입문 올인원] C++ & 자료구조/알고리즘 & STL & 게임 수학 & Windows API & 게임 서버', image: 'https://via.placeholder.com/150?text=Course+2', description: 'Rookiss', category: '게임개발' },
    { title: '[2024 리뉴얼] 처음하는 SQL과 데이터베이스(MySQL) 부트캠프 [입문부터 활용까지]', image: 'https://via.placeholder.com/150?text=Course+3', description: '잔재미코딩 DaveLee', category: '데이터사이언스' },
    { title: '넓고 얕게 외워서 컴공 전공자 되기', image: 'https://via.placeholder.com/150?text=Course+4', description: '널널한 개발자', category: '개발,프로그래밍' },
    { title: '비전공자를 위한 수학 통계 기초(이론)', image: 'https://via.placeholder.com/150?text=Course+5', description: 'SW School', category: '데이터사이언스' },
    { title: '[나만의 게임 텍스처 제작] 서브스탠스 디자이너의 모든 것', image: 'https://via.placeholder.com/150?text=Course+6', description: '광명땅콩', category: '게임개발' },
    // 추가 강의 데이터...
  ];

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    // 실제 검색 로직 추가
  };

  return (
    <RoadmapContainer>
      {/* 이미지 헤더 영역 */}
      <ImageHeaderContainer>
        <HeaderTitle>당신만의 로드맵을 찾아보세요!</HeaderTitle>
        <SearchBox>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색..."
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchBox>
      </ImageHeaderContainer>

      {/* 필터 및 콘텐츠 영역 */}
      <ContentSection>
        <FilterContainer>
          <FilterTitle>분야별</FilterTitle>
          <FilterList>
            <FilterItem onClick={() => setSelectedCategory('개발,프로그래밍')}>개발, 프로그래밍</FilterItem>
            <FilterItem onClick={() => setSelectedCategory('게임개발')}>게임개발</FilterItem>
            <FilterItem onClick={() => setSelectedCategory('데이터사이언스')}>데이터사이언스</FilterItem>
          </FilterList>

          <FilterTitle>시작레벨</FilterTitle>
          <FilterList>
            <FilterItem>입문</FilterItem>
            <FilterItem>초급</FilterItem>
            <FilterItem>중급</FilterItem>
          </FilterList>
        </FilterContainer>

        <CourseContainer>
          {courses.map((course, index) => (
            <CourseCard key={index}>
              <CourseImage src={course.image} alt={course.title} />
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
            </CourseCard>
          ))}
        </CourseContainer>
      </ContentSection>
    </RoadmapContainer>
  );
};

export default RoadmapPage;
