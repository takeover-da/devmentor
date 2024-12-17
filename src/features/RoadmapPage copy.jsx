import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';  // react-bootstrap 모달 사용
import RoadmapDetail from './RoadmapDetail';  // 상세 정보 컴포넌트 임포트

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
  color: #000000;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  position: relative;
  margin-bottom: 20px;
`;

const BannerTitle = styled.h1`
  font-size: 36px;
  margin: 0;
  font-weight: bold;
`;

const BannerDescription = styled.p`
  font-size: 18px;
  margin: 10px 0;
  font-weight: normal;
`;

// 이미지 및 항목 영역 스타일
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  margin-bottom: 40px;
`;

const Item = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  background-color: #f9f9f9;
  overflow: hidden;
  position: relative;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
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

const TagContainer = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

const Tag = styled.span`
  margin-right: 10px;
  font-weight: bold;
  color: #007bff;
`;

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
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);  // 선택된 로드맵 상태
  const [showModal, setShowModal] = useState(false);  // 모달 상태

  const filteredItems = allItems.filter(item =>
    item.roadmapTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tech.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 18;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (roadmap) => {
    setSelectedRoadmap(roadmap);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoadmap(null);
  };

  return (
    <div>
      <Banner>
        <div>
          <BannerTitle>로드맵</BannerTitle>
          <BannerDescription>다양한 개발 분야의 로드맵을 만나보세요.</BannerDescription>
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

      <ContentContainer>
        {currentItems.map(item => (
          <Item key={item.id} onClick={() => handleOpenModal(item)}>
            <ItemImage src={item.image} alt={item.tech} />
            <ItemTitle>{item.roadmapTitle}</ItemTitle>
            <TagContainer>
              <Tag>#{item.difficulty}</Tag>
              <Tag>#{item.tech}</Tag>
            </TagContainer>
            <ItemDescription>{item.description}</ItemDescription>
          </Item>
        ))}
      </ContentContainer>

      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
          <PageButton
            key={page}
            onClick={() => handlePageClick(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </PageButton>
        ))}
      </PaginationContainer>

      {/* 모달 */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedRoadmap?.roadmapTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoadmap && <RoadmapDetail roadmap={selectedRoadmap} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoadmapPage;
