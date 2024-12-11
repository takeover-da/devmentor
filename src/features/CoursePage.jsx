import React, { useRef } from "react";
import styled from "styled-components";

// Styled components 정의
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

// 배너 추가
const Banner = styled.div`
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

// 공통 슬라이더 컴포넌트
const ImageSlider = ({ title, images }) => {
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
          <Slide key={index}>
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
  const programmingImages = [
    "/images/dog1.jpg",
    "/images/dog2.png",
    "/images/dog3.png",
    "/images/dog4.jpg",
    "/images/dog5.jpg",
  ];

  const gameDevelopmentImages = [
    "/images/cat1.jpg",
    "/images/cat2.jpg",
    "/images/cat3.jpg",
    "/images/cat4.jpg",
    "/images/cat5.png",
  ];

  const dataScienceImages = [
    "/images/gui1.jpg",
    "/images/gui2.png",
    "/images/gui3.jpg",
    "/images/gui4.jpg",
    "/images/gui5.jpg",
    "/images/gui6.jpg",
  ];

  const artificialIntelligenceImages = [
    "/images/tig1.jpg",
    "/images/tig2.webp",
    "/images/tig3.webp",
    "/images/tig4.jpg",
    "/images/tig5.jpg",
  ];

  const securityNetworkImages = [
    "/images/mar1.webp",
    "/images/mar2.png",
    "/images/mar3.jpg",
    "/images/mar4.jpg",
    "/images/mar5.jpg",
  ];

  const hardwareImages = [
    "/images/pig1.jpg",
    "/images/pig2.jpg",
    "/images/pig3.jpg",
    "/images/pig4.jpg",
    "/images/pig5.jpg",
  ];

  const designImages = [
    "/images/ran1.jpg",
    "/images/ran2.jpg",
    "/images/ran3.webp",
    "/images/ran4.jpg",
    "/images/ran5.jpg",
  ];

  return (
    <div>
      <Banner>전문가들이 만든 실전 중심 강의, 지금 바로 시작하세요.</Banner>
      <ImageSlider title="프로그래밍" images={programmingImages} />
      <ImageSlider title="게임개발" images={gameDevelopmentImages} />
      <ImageSlider title="데이터사이언스" images={dataScienceImages} />
      <ImageSlider title="인공지능" images={artificialIntelligenceImages} />
      <ImageSlider title="보안/네트워크" images={securityNetworkImages} />
      <ImageSlider title="하드웨어" images={hardwareImages} />
      <ImageSlider title="디자인" images={designImages} />
    </div>
  );
};

export default CoursePage;
