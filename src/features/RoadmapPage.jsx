import React, { useState } from 'react';
import styled from 'styled-components';

// 배너 스타일 컴포넌트
const Banner = styled.section`
  width: 100%;
  height: 300px;
  background-color: #ffffff6a;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000; /* 폰트 컬러 */
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  position: relative;
  margin-bottom: 20px;
`;

const BannerTitle = styled.h1`
  font-size: 36px;
  margin: 0;
  font-weight: bold; /* h1 스타일 */
`;

const BannerDescription = styled.p`
  font-size: 18px;
  margin: 10px 0;
  font-weight: normal; /* p 스타일 */
`;

// 이미지 및 항목 영역 스타일
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개씩 */
  gap: 20px; /* 항목 간 간격 */
  padding: 20px;
  margin-bottom: 40px;
`;

const Item = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  background-color: #f9f9f9;
  overflow: hidden; /* 이미지가 아이템 밖으로 나가지 않도록 */
  position: relative;
`;

// 이미지 스타일 (호버 시 확대 효과 추가)
const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out; /* 확대 효과를 부드럽게 적용 */
  
  &:hover {
    transform: scale(1.1); /* 마우스 호버 시 이미지를 확대 */
  }
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  margin-top: 10px;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;

// 기술명과 난이도 표시 영역 (해시태그 형식)
const TagContainer = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

const Tag = styled.span`
  margin-right: 10px;
  font-weight: bold;
  color: #007bff; /* 해시태그 색상 */
`;

// 검색창과 버튼 스타일
const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

// 페이지 네비게이션 버튼
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }

  &.active {
    background-color: #ffffff;
  }
`;

const RoadmapPage = () => {
  const allItems = [
    { id: 1, image: "/images/dog1.jpg", roadmapTitle: "Java 끝장내기", difficulty: "초급", tech: "Java", description: "기초부터 시작하는 Java 프로그래밍" },
    { id: 2, image: "/images/dog2.png", roadmapTitle: "React 완전 정복", difficulty: "중급", tech: "React", description: "React를 활용한 프론트엔드 개발" },
    { id: 3, image: "/images/dog3.png", roadmapTitle: "Spring Boot 심화", difficulty: "고급", tech: "Spring Boot", description: "Spring Boot를 활용한 백엔드 개발" },
    { id: 4, image: "/images/dog4.jpg", roadmapTitle: "Node.js 기본부터", difficulty: "초급", tech: "Node.js", description: "Node.js를 활용한 서버 사이드 개발" },
    { id: 5, image: "/images/dog5.jpg", roadmapTitle: "Python 데이터 분석", difficulty: "초급", tech: "Python", description: "Python을 활용한 데이터 분석" },
    { id: 6, image: "/images/cat1.jpg", roadmapTitle: "Django 웹 개발", difficulty: "중급", tech: "Django", description: "Django를 사용한 웹 개발" },
    { id: 7, image: "/images/cat2.jpg", roadmapTitle: "C# 게임 개발", difficulty: "고급", tech: "C#", description: "C#을 활용한 게임 개발" },
    { id: 8, image: "/images/cat3.jpg", roadmapTitle: "Node.js 서버 개발", difficulty: "초급", tech: "Node.js", description: "Node.js를 활용한 서버 사이드 개발" },
    { id: 9, image: "/images/cat4.jpg", roadmapTitle: "Python 데이터 분석", difficulty: "초급", tech: "Python", description: "Python을 활용한 데이터 분석" },
    { id: 10, image: "/images/cat5.png", roadmapTitle: "Django 웹 개발", difficulty: "중급", tech: "Django", description: "Django를 사용한 웹 개발" },
    { id: 11, image: "/images/gui1.jpg", roadmapTitle: "C# 게임 개발", difficulty: "고급", tech: "C#", description: "C#을 활용한 게임 개발" },
    { id: 12, image: "/images/gui2.png", roadmapTitle: "JavaScript 기초", difficulty: "초급", tech: "JavaScript", description: "JavaScript의 기본과 웹 개발" },
    { id: 13, image: "/images/gui3.jpg", roadmapTitle: "HTML 마스터하기", difficulty: "초급", tech: "HTML", description: "HTML을 사용한 웹 페이지 작성" },
    { id: 14, image: "/images/gui4.jpg", roadmapTitle: "CSS 디자인", difficulty: "초급", tech: "CSS", description: "CSS를 사용한 웹 디자인" },
    { id: 15, image: "/images/gui5.jpg", roadmapTitle: "Angular 완전 정복", difficulty: "중급", tech: "Angular", description: "Angular로 프론트엔드 개발" },
    { id: 16, image: "/images/gui6.jpg", roadmapTitle: "Vue.js 심화", difficulty: "중급", tech: "Vue.js", description: "Vue.js를 사용한 웹 애플리케이션 개발" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 검색어에 맞는 항목 필터링
  const filteredItems = allItems.filter(item => 
    item.roadmapTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tech.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 18; // 한 페이지에 표시될 항목 개수 (6줄 * 3개 항목)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* 배너 섹션 */}
      <Banner>
        <div>
          <BannerTitle>로드맵</BannerTitle> {/* h1 스타일로 수정 */}
          <BannerDescription>다양한 개발 분야의 로드맵을 만나보세요.</BannerDescription> {/* p 스타일로 수정 */}
          
          {/* 검색 기능 */}
          <SearchContainer>
            <SearchInput 
              type="text" 
              placeholder="검색..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <SearchButton>검색</SearchButton>
          </SearchContainer>
        </div>
      </Banner>

      {/* 이미지, 기술, 설명 영역 */}
      <ContentContainer>
        {currentItems.map(item => (
          <Item key={item.id}>
            <ItemImage src={item.image} alt={item.tech} />
            <ItemTitle>{item.roadmapTitle}</ItemTitle> {/* 로드맵 제목으로 변경 */}
            
            {/* 기술명과 난이도 표시 (해시태그 형식) */}
            <TagContainer>
              <Tag>#{item.difficulty}</Tag>
              <Tag>#{item.tech}</Tag>
            </TagContainer>

            <ItemDescription>{item.description}</ItemDescription>
          </Item>
        ))}
      </ContentContainer>

      {/* 페이지 네비게이션 */}
      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <PageButton
            key={page}
            onClick={() => handlePageClick(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </PageButton>
        ))}
      </PaginationContainer>
    </div>
  );
};

export default RoadmapPage;
