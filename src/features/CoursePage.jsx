import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Context } from "../index";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 0;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #ffffff;
  padding: 20px 0;
  /* box-shadow: 0 2px 4px rgba(0,0,0,0.1); */
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 10px;
  animation: ${fadeIn} 1s ease-out;
`;

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out 0.5s both;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 25px 0 0 25px;
  outline: none;

  &:focus {
    border-color: #555;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #333;
  border: none;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const StyledCarousel = styled(Carousel)`
  .carousel .slide {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    /* box-shadow: 0 4px 6px rgba(0,0,0,0.1); */
  }

  .carousel .slide img {
    max-height: 400px;
    object-fit: cover;
  }

  .carousel .legend {
    background: rgba(0,0,0,0.7);
    border-radius: 10px;
    bottom: 40px;
    color: #fff;
    font-size: 14px;
    max-width: 80%;
    padding: 15px;
    opacity: 1;
  }

  .carousel .control-dots {
    bottom: 0;
  }

  .carousel .control-dots .dot {
    box-shadow: none;
    background: #4a90e2;
    outline: 0;
  }

  .carousel .control-arrow {
    background: rgba(0,0,0,0.3);
    border-radius: 50%;
    height: 50px;
    width: 50px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const CourseImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CourseInfo = styled.div`
  padding: 20px;
`;

const CourseTitle = styled.h2`
  color: #333;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const CourseDescription = styled.p`
  color: #666;
  font-size: 1em;
  margin-bottom: 10px;
`;

const CourseInstructor = styled.p`
  color: #4a90e2;
  font-weight: bold;
`;

const CourseDate = styled.p`
  color: #999;
  font-size: 0.9em;
`;

const CoursePage = () => {
  const [courseData, setCourseData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const { host } = useContext(Context);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${host}/lecture/list`, {
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          console.log("API response:", response.data);
          setCourseData(response.data);
        }
      } catch (error) {
        console.error("API call error:", error);
      }
    };

    fetchCourses();
  }, [token, host]);

  const filteredCourses = courseData.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <GlobalStyle />
      <Header>
        <Container>
          <Title>강의 목록</Title>
          <Subtitle>시작부터 실전까지...!</Subtitle>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="강의 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton>검색</SearchButton>
          </SearchContainer>
        </Container>
      </Header>
      <Container>
        <StyledCarousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course.lectureNo}>
              <CourseImage
                src={course.fileurl || '/placeholder-image.jpg'}
                alt={`강의 이미지 ${course.title}`}
              />
              <CourseInfo>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                <CourseInstructor>강사: {course.instructorName}</CourseInstructor>
                <CourseDate>
                  등록일: {new Date(course.regDate).toLocaleDateString()}
                </CourseDate>
              </CourseInfo>
            </CourseCard>
          ))}
        </StyledCarousel>
      </Container>
    </>
  );
};

export default CoursePage;

