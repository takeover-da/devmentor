import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { Modal } from 'react-bootstrap';
import RoadmapDetail from './RoadmapDetail';
import axios from 'axios';
import { Context } from "../index";
import { Link } from "react-router-dom";

const textAppear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

const BannerTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BannerTitle = styled.h1`
  font-size: 36px;
  margin: 0;
  font-weight: bold;
  opacity: 0;
  animation: ${textAppear} 1s ease forwards;
  animation-delay: 0.2s;
  display: block;
`;

const BannerDescription = styled.p`
  font-size: 18px;
  margin: 10px 0;
  font-weight: normal;
  opacity: 0;
  animation: ${textAppear} 1s ease forwards;
  animation-delay: 1s;
  display: block;
`;

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
  const [roadmapData, setRoadmapData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const { host } = useContext(Context);

  // API 호출하여 로드맵 데이터 가져오기
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await axios.get(`${host}/roadmap/list`, {
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          setRoadmapData(response.data);
        }
      } catch (error) {
        console.error("로드맵 API 호출 오류:", error);
      }
    };

    fetchRoadmaps();
  }, [host, token]);

  const filteredRoadmaps = roadmapData.filter((roadmap) => {
    const titleMatch = roadmap.title && roadmap.title.toLowerCase().includes(searchTerm.toLowerCase());
    const difficultyMatch = roadmap.difficulty && roadmap.difficulty.toString().toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || difficultyMatch;
  });

  const itemsPerPage = 18;
  const totalPages = Math.ceil(filteredRoadmaps.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoadmaps.slice(indexOfFirstItem, indexOfLastItem);

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
          <Item key={item.roadmapNo} onClick={() => handleOpenModal(item)}>
            {/* 썸네일 이미지 사용 */}
            {item.thumnail && <ItemImage src={item.thumnail} alt={item.title} />}
            <ItemTitle>{item.title}</ItemTitle>
            <TagContainer>
              <Tag>#{item.difficulty === 0 ? '초급' : item.difficulty === 1 ? '중급' : '고급'}</Tag>
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
          <Modal.Title>{selectedRoadmap?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoadmap && <RoadmapDetail roadmap={selectedRoadmap} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoadmapPage;
