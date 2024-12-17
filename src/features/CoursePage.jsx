import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Modal } from "react-bootstrap"; // react-bootstrap 모달 사용
import CourseDetail from './CourseDetail'; // 강의 상세 정보 페이지
import RoadmapDetail from './RoadmapDetail'; // 로드맵 상세 정보 컴포넌트

// 한 줄씩 뚝뚝 나오는 애니메이션 정의
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
  flex-direction: column; /* 텍스트를 한 줄씩 배치 */
  align-items: center;
`;

const BannerTitle = styled.h1`
  font-size: 36px;
  margin: 0;
  font-weight: bold;
  opacity: 0;
  animation: ${textAppear} 1s ease forwards;
  animation-delay: 0.2s; /* 첫 번째 줄은 0.2초 후에 애니메이션 시작 */
  display: inline-block; /* 각 텍스트를 한 줄씩 표시 */
`;

const BannerDescription = styled.p`
  font-size: 18px;
  margin: 10px 0;
  font-weight: normal;
  opacity: 0;
  animation: ${textAppear} 1s ease forwards;
  animation-delay: 1s; /* 두 번째 줄은 1초 후에 애니메이션 시작 */
  display: inline-block; /* 각 텍스트를 한 줄씩 표시 */
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

// 슬라이더 및 강의 상세
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 30px; /* 카테고리 간 간격 */
  padding: 0 20px; /* 좌우 여백 추가 */
`;

const Title = styled.h2`
  margin-top: 20px; /* 헤더와 슬라이더 사이에 여백 추가 */
  margin-bottom: 10px; /* 헤더 하단 여백 */
  font-size: 24px;
  font-weight: bold;
`;

const Slider = styled.div`
  display: flex;
  overflow-x: hidden; /* 가로 스크롤바 제거 */
  gap: 10px; /* 슬라이드 간 간격 */
  padding: 20px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  margin: 0; /* 슬라이드 간 마진 제거 */
  max-width: calc(100% - 40px); /* 여백을 고려하여 100%에서 40px을 뺀 값 */
`;

const Slide = styled.div`
  flex: 0 0 33.3333%; /* 한 줄에 3개씩 보이도록 설정 */
  height: 400px;
  scroll-snap-align: start;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  margin-right: 10px; /* 각 슬라이드 간 마진 추가 */

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  /* 마지막 슬라이드에서는 마진을 없애기 */
  &:last-child {
    margin-right: 0;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%; /* 높이를 100%로 설정 */
  object-fit: cover; /* 비율을 유지하며 잘라내기 */
  display: block;
  border-radius: 10px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 30px;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  ${(props) => (props.left ? "left: 10px;" : "right: 10px;")}

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

// 공통 슬라이더 컴포넌트
const ImageSlider = ({ title, images, onClick }) => {
  const sliderRef = useRef(null);

  const scrollToSlide = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = (300 + 10) * 3; // 3개씩 이동 (각 슬라이드 크기 300px + 간격 10px)
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <SliderContainer>
      <Title>{title}</Title> {/* 헤더에 여백 추가 */}
      <ArrowButton left onClick={() => scrollToSlide("left")}>
        &#8249;
      </ArrowButton>
      <Slider ref={sliderRef}>
        {images.map((image, index) => (
          <Slide key={index} onClick={() => onClick(index)}> {/* 슬라이드를 클릭했을 때 해당 강의 정보 열기 */}
            <Image src={image} alt={`Slide ${index + 1}`} />
          </Slide>
        ))}
      </Slider>
      <ArrowButton right onClick={() => scrollToSlide("right")}>
        &#8250;
      </ArrowButton>
    </SliderContainer>
  );
};

const CoursePage = () => {
  const [showModal, setShowModal] = useState(false); // 모달 열기/닫기
  const [selectedCourse, setSelectedCourse] = useState(null); // 선택된 강의 정보
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  const courseData = [
    {
      title: "프로그래밍",
      images: [
        "/images/dog1.jpg",
        "/images/dog2.png",
        "/images/dog3.png",
        "/images/dog4.jpg",
        "/images/dog5.jpg",
      ],
    },
    {
      title: "게임개발",
      images: [
        "/images/dog1.jpg",
        "/images/dog2.png",
        "/images/dog3.png",
        "/images/dog4.jpg",
        "/images/dog5.jpg",
      ],
    },
    // 다른 카테고리들...
  ];

  const filteredCourseData = courseData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 강의 클릭 시 모달 열기
  const handleOpenModal = (index) => {
    const course = filteredCourseData[index];
    setSelectedCourse(course); // 선택한 강의 정보 저장
    setShowModal(true); // 모달 열기
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
    setSelectedCourse(null); // 선택된 강의 초기화
  };

  return (
    <div>
      {/* 배너 영역 */}
      <Banner>
        <div>
          <BannerTitleWrapper>
            <BannerTitle>강의</BannerTitle>
            <BannerDescription>시작부터 실전까지...!</BannerDescription>
          </BannerTitleWrapper>
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

      {/* 슬라이더 및 강의 리스트 */}
      {filteredCourseData.map((course, index) => (
        <ImageSlider
          key={index}
          title={course.title}
          images={course.images}
          onClick={() => handleOpenModal(index)} // 슬라이드를 클릭하면 모달 열리기
        />
      ))}

      {/* 강의 상세 정보를 모달로 표시 */}
      <Modal show={showModal} onHide={handleCloseModal} centered size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCourse?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCourse ? (
            <CourseDetail course={selectedCourse} /> // CourseDetail 컴포넌트에 선택된 강의 정보 전달
          ) : (
            <p>강의 정보를 불러오는 중...</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CoursePage;
